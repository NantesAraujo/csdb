require('dotenv').config()
const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const conexaoBD = require('./conexaoBD')

const port = process.env.port || 3000

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.post('/users', async (req, res) => {
    var user = req.body;
    const conn = await conexaoBD();
    conn.collection('usuarios').insertOne(user);    
    res.status(200).send("salvo com sucesso!");
})

app.listen(port, function() { 
  console.log('servidor rodando na porta: ' + port); 
  console.log(process.env.MONGODB_URI);
});