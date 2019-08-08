const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://carlos:Carlos123@cluster0-2tbfp.mongodb.net/test?retryWrites=true&w=majority";
const localHost = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";

if(!process.env.MONGODB_URI) {
    throw new Error('Missing env MONGODB_URI');
}

let client = null;

module.exports = function getDb() {
    if(client && !client.isConnected){
        client = null;
        console.log('[Mongo] client discard');
    }

    if(client === null){
        client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log('[Mongo] client init');
    } else if(client.isConnected){
        console.log("[Mongo] client connected, quick return");
        return client.db(process.env.MONGO_DB_NAME);
    }

    return new Promise((resolve, reject) => {
        client.connect(err => {
            if(err) {
                client = null;
                console.error('[Mongo] client err', err);
                return reject(err);
            }

            console.log('[Mongo] connected');
            resolve(client.db(process.env.MONGO_DB_NAME));
        });
    });
}

// const client = new MongoClient(localHost, { useNewUrlParser: true });