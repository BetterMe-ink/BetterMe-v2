const db = require("../db-models/db-models");

const foodEntryController = {};

foodEntryController.getEntry = (req, res, next) => {
    const {id} = req.params;
    db.query('SELECT * FROM dailyfood_entry WHERE user_id = ($1)', [id], (err, result) => {
        if(err) return next(err);
        if(!result.rows.length) return res.status(200).json('No entries found');
        res.locals.entries = result.rows;
        next();
    })
}

foodEntryController.createEntry =(req, res, next) => {
    const {id} = req.params;
    const {meal1, meal1_cfp, meal2, meal2_cfp, meal3, meal3_cfp, total_calories, weight, date_created} = req.body;
    const query = 
    `INSERT INTO dailyfood_entry (meal1, meal1_cfp, meal2, meal2_cfp, meal3, meal3_cfp, total_calories, weight, date_created, user_id) 
    VALUES(($1), ($2), ($3), ($4), ($5), ($6), ($7),($8), ($9),($10)) 
    RETURNING *`
    db.query(query, [meal1, meal1_cfp, meal2, meal2_cfp, meal3, meal3_cfp, total_calories, weight, date_created, id], (err, result) => {
        if(err) return next(err);
        if(!result.rows.length) return res.status(200).json('Failed to create entry')
        res.locals.entry = result.rows[0];
        next();
    })
};

module.exports = foodEntryController;