const express = require("express");
const router = express.Router();
const db = require("../db-models/db-models.js");

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const q = "SELECT * FROM userDetails WHERE user_id=($1)";

  await db.query(q, [id], (err, result) => {
    if (err) {
      return res.status(400).send("Error showing user details");
    }
    return res.status(200).json({ data: result.rows[0] });
  });
});

router.post("/:id/create", async (req, res) => {
  const id = req.params.id;
  const {
    height,
    weight,
    age,
    favoriteFood,
    nonFavoriteFood,
    diet_type,
    allergies,
  } = req.body;
  const q =
    "INSERT INTO userDetails (user_id, age, height, weight,diet_type, allergies,favoriteFood, nonFavoriteFood) VALUES(($1), ($2), ($3), ($4), ($5), ($6), ($7),($8))";
  await db.query(
    q,
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
});

router.put("/:id/update", async function (req, res) {
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
console.log(req.body)
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
