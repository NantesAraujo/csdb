const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express();
const bodyparser = require('body-parser')

const uri = "mongodb+srv://carlos:Carlos123@cluster0-2tbfp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.post('/users', (req, res) => {
    var user = req.body;
    console.log('body');
    console.log(user);

    client.connect(err => {
        const collection = client.db('csdb').collection('usuarios').insertOne(user);
        client.close();
      });

    res.status(200).send("slvo com sucesso!");
})

app.listen(3000, function() { console.log('servidor rodando na porta: '); });