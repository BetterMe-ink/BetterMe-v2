const db = require("../db-models/db-models");
const bcrypt = require('bcrypt')
const userController = {};

//CONTROLLERS HERE

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  
  const q = "SELECT * FROM users WHERE username=($1)";

  db.query(q, [username], (err, data) => {
    if (err) return next(err);
    if (data.rows.length > 0) {
      bcrypt.compare(password, data.rows[0].password) 
      .then((result) => {
        if(result){
          res.locals.message = "successfully logged in";
          const {user_id, fullname, username, email, date_joined} = data.rows[0]
          res.cookie("user", JSON.stringify({user_id, fullname, username, email, date_joined}), {
            maxAge: 1000*60*60*24*7*3,
            httpOnly: false,
          });
          return next()
        } else {
          res.locals.error = "wrong username or password";
          return next()
        }
      })
      .catch((err) => next(err))
    }
  })
}

userController.signup = async (req, res, next) => {
  const { fullName, username, password, email } = req.body;
  const q = "SELECT * FROM users WHERE username=($1) OR email=($2)";

  db.query(q, [username, email], async (err, data) => {
    if (err) return next(err);
    const result = data;
    if (result.rows.length > 0) {
      res.locals.error =
        "Account with this username/email already exists. Please try with different username/email";
      next();
    } else {
      const hash = await bcrypt.hash(password, 10)
      db.query(
        "INSERT INTO users (username, fullName, password, email) VALUES (($1), ($2), ($3), ($4))",
        [username, fullName, hash, email],
        (err, data) => {
          if (err) return next(err);
          db.query("SELECT * FROM users WHERE username=($1)", [username], (err, data) => {
              res.cookie("user", JSON.stringify(data.rows[0]), {
                maxAge: 1000*60*60*24*7*3,
                httpOnly: false
              });
              res.locals.message = "Successfully Signed Up!";
              return next();
            }
          );
        });
    }
  });
};

userController.update = async (req, res, next) => {
  const { id } = req.params;
  let { fullName, username, password, email } = req.body;
  if (password.length < 20 && password) {
    password = await bcrypt.hash(password, 10);
  }
  db.query(
    "UPDATE users SET username =($1), password=($2), email=($3), fullName=($4) WHERE user_id=($5) RETURNING *;",
    [username, password, email, fullName, id],
    (err, result) => {
    if (err) return res.status(411).send("Error updating userAccountDetails");
    res.cookie("user", JSON.stringify(result.rows[0]), {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: false,
    })
    next()
  })
}

userController.createDetails = async (req, res, next) => {
  const id = req.params.id;
  const {height, weight, age, favoriteFood, nonFavoriteFood, diet_type, allergies,} = req.body;
  const query =
    "INSERT INTO userDetails (user_id, age, height, weight,diet_type, allergies,favoriteFood, nonFavoriteFood) VALUES(($1), ($2), ($3), ($4), ($5), ($6), ($7),($8))";
  db.query(
    query,
    [id, age, height, weight, diet_type, allergies, favoriteFood, nonFavoriteFood],
    (err, result) => {
      if (err) return next(err)
      next()
    }
  )
}

module.exports = userController;