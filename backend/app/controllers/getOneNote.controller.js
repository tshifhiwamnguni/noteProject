const db = require("../configs/db.config");

exports.getOneNote = (req, res) =>{
    // const {user_id} = req.body;
    const id = req.params.id;

    db.query('SELECT * FROM notes WHERE id = $1',[id],(err, results)=>{
        if(err){
            res.status(400).json({error: 'failed to delete post'});
        }
        res.status(200).json(results.rows)
    })
}