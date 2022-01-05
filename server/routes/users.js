const express = require("express");
const router = express.Router();
const db = require("../db-models/db-models.js");
const appControllers = require("../controller/controller.js");
const bcrypt = require("bcrypt");

router.post("/signup", appControllers.signup, (req, res) => {
  console.log("this is the message: ", res.locals.message);
  console.log("this is error:", res.locals.error);

  if (res.locals.validationErrors) {
    return res.json(res.locals.validationErrors);
  }

  if (res.locals.message) {
    return res.status(200).json({ message: res.locals.message });
  }

  if (res.locals.error) {
    return res.status(400).send(res.locals.error);
  }
});

router.post("/login", appControllers.login, (req, res) => {
  if (res.locals.error) {
    res.status(400).json({ error: res.locals.error });
  }
  if (res.locals.message) {
    res.status(200).json({ message: res.locals.message });
  }
});

router.put("/:id/updateProfile", async (req, res) => {
  const { id } = req.params;
  let { fullName, username, password, email } = req.body;

  if (password.length < 20 && password) {
    password = await bcrypt.hash(password, 10);
  }
  // NAIVE APPROACH
  // const updateParams = []
  // if (fullName) updateParams.push('fullName')
  // if (username) updateParams.push('username')
  // if (password) updateParams.push('password')
  // if (email) updateParams.push('email')
  // const variables = []
  // if (fullName) variables.push(fullName)
  // if (username) variables.push(username)
  // if (password) variables.push(password)
  // if (email) variables.push(email)
  // if (id) variables.push(id)

  // let queryArr =  []
  // for(let i in updateParams){
  //   queryArr.push(`${updateParams[i]}=($${+i+1})`)
  // }
  // q += queryArr.join(', ')
  // q += `WHERE user_id=($${variables.length})`

  let q = `UPDATE users SET 
  username = COALESCE(NULLIF(username = ($1), ''), username), 
  password = COALESCE(NULLIF(password = ($2), ''), password),
  email = COALESCE(NULLIF(email = ($3), ''), email),
  fullName = COALESCE(NULLIF(fullName = ($4), ''), fullName)
  WHERE user_id=($5)
  RETURNING *;
  `;

  db.query(
    "UPDATE users SET username =($1), password=($2), email=($3), fullName=($4) WHERE user_id=($5) RETURNING *",
    [username, password, email, fullName, id],
    (err, result) => {
      console.log(err, result);
      if (err) {
        return res.status(411).send("Error updating userAccountDetails");
      }
      if (result) {
        res.cookie("user", JSON.stringify(result.rows[0]), {
          maxAge: 1000 * 60 * 60 * 24 * 3,
          httpOnly: false,
        });
        return res.status(200).send("User Details updated successfully");
      }
    }
  );
});

module.exports = router;
