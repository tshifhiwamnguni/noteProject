const express = require("express");
const app = express();
const cors = require("cors"); 

app.use(cors({origin: '*'}));
const db = require('./app/configs/db.config');

app.get("/", (req, res) => {
  console.log("running");
  res.send("running");
});

db.connect((error)=>{
    if(error){
        console.log('there is an error on your connection string');
        return error;
    }
    console.log('you are doing wonders');
});


const port = process.env.PORT || 3333;

//require controllers
const register = require('./app/routes/register.route');
const login = require('./app/routes/login.route');
const create = require('./app/routes/create.route');
const update = require('./app/routes/update.route');
const deleting = require('./app/routes/delete.route');
const get = require('./app/routes/getNote.route');
const getId = require('./app/routes/getUserId.route');
const getOneNote = require('./app/routes/getOneNote.route');
const updatePassword = require('./app/routes/updatePass.route');
//end points
app.use('/api', register);
app.use('/api', login);
app.use('/api', create);
app.use('/api', update);
app.use('/api', deleting);
app.use('/api', get);
app.use('/api', getId);
app.use('/api',getOneNote);
app.use('/api', updatePassword);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
