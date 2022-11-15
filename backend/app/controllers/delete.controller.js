const db = require("../configs/db.config");

exports.delete = (req,res)=>{
    // const {id, user_id} =req.body;
    const id = req.params.id;
    const user_id = req.params.user_id;
    try {
        db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [id, user_id],(err)=>{
            if(err){
                return res.status(400).json({error: 'not deleted'});
            }
            res.status(200).json({success: `successfully deleted the note`});
        })
    } catch (error) {
        res.status(500).json({error: 'database error'});
    }
}