const db = require("../configs/db.config");

exports.getall = (req, res) =>{
    // const {user_id} = req.body;
    const user_id = req.params.id;

    db.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC',[user_id],(err, results)=>{
        if(err){
            res.status(400).json({error: 'failed to delete post'});
        }
        res.status(200).json(results.rows)
    })
}