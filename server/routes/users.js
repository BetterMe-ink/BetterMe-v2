const express = require("express");
const router = express.Router();
const db = require("../db-models/db-models.js");
const userController = require("../controller/userController.js");

router.post("/", userController.signup, (req, res) => {
  if (res.locals.validationErrors) {
    return res.json(res.locals.validationErrors);
  } else if (res.locals.message) {
    return res.status(200).json({ message: res.locals.message });
  } 
});
router.post("/login", userController.login, (req, res) => {
  if (res.locals.error) {
    res.status(400).json({ error: res.locals.error });
  }
  if (res.locals.message) {
    res.status(200).json({ message: res.locals.message });
  }
});

router.put("/:id", userController.update, async (req, res) => {
  return res.status(200).json("User Details updated successfully");
})

router.post("/:id", userController.createDetails, async (req, res) => {
  
});

router.get("details/:id", async (req, res) => {
  const id = req.params.id;

  const q = "SELECT * FROM userDetails WHERE user_id=($1)";

  await db.query(q, [id], (err, result) => {
    if (err) {
      return res.status(400).send("Error showing user details");
    }
    console.log(result.rows[0])
    return res.status(200).json({ data: result.rows[0] });
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    age,
    height,
    weight,
    diet_type,
    allergies,
    favoriteFood,
    nonFavoriteFood,
  } = req.body;
  const lookup = "SELECT * FROM userDetails WHERE user_id=($1)";
  db.query(lookup, [id], (err, entry) => {
    if (err) return next(err);
    if (entry.rows[0]) {
      const query =
        "UPDATE userDetails SET age=($1), weight=($2), height=($3), diet_type=($4), allergies=($5), favoriteFood=($6), nonFavoriteFood=($7) WHERE user_id=($8)";
      db.query(
        query,
        [
          age,
          weight,
          height,
          diet_type,
          allergies,
          favoriteFood,
          nonFavoriteFood,
          id,
        ],
        (err, result) => {
          if (err) {
            return res.status(400).send("Error updating user details");
          }
          return res.status(200).send("Successfully updated user details");
        }
      );
    } else {
      const k =
        "INSERT INTO userDetails (user_id, age, height, weight, diet_type, allergies, favoriteFood, nonFavoriteFood) VALUES(($1), ($2), ($3), ($4), ($5), ($6), ($7),($8))";
      db.query(
        k,
        [
          id,
          age,
          height,
          weight,
          diet_type,
          allergies,
          favoriteFood,
          nonFavoriteFood,
        ],
        (err, result) => {
          if (err) {
            return res.status(400).send("Error creating user details");
          }
          return res.status(200).send("Successfully created user details");
        }
      );
    }
  });
});

module.exports = router;
