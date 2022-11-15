const db = require("../configs/db.config");

exports.update = (req, res) => {
  const { id, user_id, title, note, private } = req.body;

  try {
    db.query(
      "UPDATE notes SET title = $1, note =$2, private =$3 WHERE user_id = $4 and id = $5 RETURNING *",
      [title, note, private, user_id,parseInt(id)],
      (err) => {
        if (err) {
          res.status(400).json({ error: "couldnt update" });
        }
        res.status(201).json({ success: `successfull update ${title}` });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "database error" });
  }
};
