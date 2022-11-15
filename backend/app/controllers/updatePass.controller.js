const db = require("../configs/db.config");
const bcrypt = require("bcrypt");

exports.updatePassword = async (req, res) => {
    const { cPassword, password } = req.body;
    const id = parseInt(req.params.id);

    try {
        const user = await db.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);

        const userArr = user.rows;

        if (userArr.length == 0) {
            return res.status(400).json({ error: "user does not exists" });
        } else {
            bcrypt.compare(cPassword, userArr[0].password, (err, results) => {
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });

                } else if (results === true) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            res.status(400).json({ error: "not protected" });
                        }

                        const user = {
                            password: hash,
                        };

                        db.query('UPDATE users SET password = $1', [user.password], (err) => {
                            if (err) {
                                res.status(400).json({ error: "Failed to change the password" });
                            }

                            res.status(200).json({ message: 'Password successfully changed' });
                        })
                    })

                } else {
                    res.status(400).json({ error: "Wrong current password" });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: "database error" });
    }
};
