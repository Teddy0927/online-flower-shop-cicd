import  * as mongoDB from 'mongodb';

const uri = "mongodb://root:example@127.0.0.1:27017";

const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

client.connect();
