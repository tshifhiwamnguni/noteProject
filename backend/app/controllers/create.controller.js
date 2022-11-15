const db = require("../configs/db.config");

exports.create = (req, res) => {
  const { user_id, title, note, private } = req.body;

  var date = new Date().toDateString()
  + ' ' + new Date().getHours()
  + ':' + new Date().getMinutes() + ':'
  + new Date().getSeconds();

  try {
    db.query(
      "INSERT INTO notes (user_id, title, note, private, date) VALUES($1,$2,$3,$4,$5)",
      [user_id, title, note, private, date],
      (err) => {
        if (err) {
          res.status(400).json({ error: "couldnt add" });
        } 
          res.status(201).json({ success: "successfull added" });
        
      }
    );
  } catch (error) {
    res.status(500).json({ error: "database error" });
  }
};
