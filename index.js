const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT | 3001;
const authRouter = require('./routes/auth');
const documentRouter = require('./routes/documnet');

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(documentRouter);


const DB="mongodb+srv://aryan:mongo@docsc.y8ch6d4.mongodb.net/?retryWrites=true&w=majority&appName=docsC";

mongoose.connect(DB)
.then(()=>{
    console.log('Connected to mongo');
})
.catch(e=>console.log(e));



app.listen(PORT,"0.0.0.0",()=>{
    console.log('Connected to the port')
});
