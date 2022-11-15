const db = require("../configs/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "iaujshfklausfokjvuorjvksuirefkjauirjkauerfvkajbsru;foajckrabuv";

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const userArr = user.rows;

    if (userArr.length == 0) {
      return res.status(400).json({ error: "user does not exists" });
    } else {
      bcrypt.compare(password, userArr[0].password, (err, results) => {
        if (err) {
             res.status(500).json({
            error: "Server Error",
          });
          
        } else if (results === true) {
          const token = jwt.sign(
            {
              id: userArr[0].id,
              email: userArr[0].email,
              name: userArr[0].name,
            },
            SECRET_KEY,
            {
              expiresIn: "5h",
            }
          );
          res.status(200).json({message: 'successfully logged in', token: token});
        }else{
            res.status(400).json({ error: "wrong password" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "database error" });
  }
};
