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

userController.signup = (req, res, next) => {
  console.log('A')
  const { fullName, username, password, email } = req.body;
  const q = "SELECT * FROM users WHERE username=($1) OR email=($2)";
  try {
    db.query(q, [username, email], async (err, user)=>{
      if (user.rows.length > 0) {
        console.log('B')
        res.locals.error =
        "Account with this username/email already exists. Please try with different username/email";
        next();
      } else {
        console.log('C')
        try {
          const hash = await bcrypt.hash(password, 10)
          console.log(hash)
          db.query(
            "INSERT INTO users (username, fullName, password, email) VALUES (($1), ($2), ($3), ($4)) RETURNING *", 
            [username, fullName, hash, email], 
            (err, success) => {
              if (err) return next(err)
              res.locals.newUser = success.rows[0]
              res.cookie("user", JSON.stringify(success.rows[0]), {
                maxAge: 1000*60*60*24*7*3,
                httpOnly: false
              });
              return next();
            })
          } catch (error) {
            return next(error)
          }
        }
    })
  } catch(err){
    return next(err);
  }
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

userController.createDetails = (req, res, next) => {
  const id = req.params.id;
  const {height, weight, age, favoriteFood, nonFavoriteFood, diet_type, allergies,} = req.body;
  const query =
    "INSERT INTO userDetails (user_id, age, height, weight, diet_type, allergies,favoriteFood, nonFavoriteFood) VALUES(($1), ($2), ($3), ($4), ($5), ($6), ($7),($8)) RETURNING *";
  db.query(
    query,
    [id, age, height, weight, diet_type, allergies, favoriteFood, nonFavoriteFood],
    (err, result) => {
      if (err) return next(err)
      next()
    }
  )
}

userController.getDetails = (req, res, next) => {
  const {id} = req.params
  const q = `SELECT * FROM userdetails WHERE user_id=($1)`;
  db.query(q, [id], (err, result) => {
    if (err) return next(err)
    res.locals.data = result.rows[0]
    next()
  });
}

userController.updateDetails = (req, res, next) => {
  const {id} = req.params
  const {
    age,
    height,
    weight,
    diet_type,
    allergies,
    favoriteFood,
    nonFavoriteFood,
  } = req.body;

  const lookup = "SELECT * FROM userdetails WHERE user_id=($1)";
  db.query(lookup, [id], (err, result) => {
    if (err) return next(err);
    if (result.rows.length > 0) {
      const query =
        `UPDATE userdetails
         SET age=($1), weight=($2), height=($3), diet_type=($4), allergies=($5), favoriteFood=($6), nonFavoriteFood=($7) 
         WHERE user_id=($8) RETURNING *;`
      db.query(
        query, [age, weight, height, diet_type, allergies, favoriteFood, nonFavoriteFood, id],
        (err, result) => {
          if (err) return next(err)
          res.locals.userDetails = result
          next()
        })
    } else {
      const k =
        `INSERT INTO userdetails (user_id, age, height, weight, diet_type, allergies, favoriteFood, nonFavoriteFood) 
         VALUES(($1), ($2), ($3), ($4), ($5), ($6), ($7),($8)) RETURNING *;`
      db.query(
        k, [id, age, height, weight, diet_type, allergies, favoriteFood, nonFavoriteFood],
        (err, result) => {
          if (err) return next(err)
          res.locals.userDetails = result
          next()
        }
      );
    }
  });
}

module.exports = userController;