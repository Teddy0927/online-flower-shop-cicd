import * as mongoDB from "mongodb";
// import { logger } from "./util/logger";



export async function connectToDatabase () {

    // const uri = "mongodb://root:example@127.0.0.1:27017";
    // const uri = "mongodb://127.0.0.1:27017";
    const uri = "mongodb://root:example@mongo:27017";


    const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db("sample");

    console.log('Connection to mongoDB success!')

    return db;
   
};
