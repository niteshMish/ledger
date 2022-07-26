
const express = require('express');
const port =   8000;
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());





const home_controller = require('./controller/main_controller');




// app.use(express.static('./assets'));
// app.use(expressLayouts);
// app.set('layouts extractStyles' , true);
// app.set('layouts extractScripts' , true);
// app.set('view engine','ejs');
// app.set('views','./views');
app.use('/',require('./routes/index'));

app.listen(port , function(err){
    if(err){
        console.log("Error in Listening from the server");
        return ;
    }
    console.log(`yeap ! server is up on the port ${port}`);

})
