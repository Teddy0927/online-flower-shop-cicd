import { connectToDatabase } from '../testing';
import { Db, ObjectId } from "mongodb";

export class itemService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    itemAll = async () => {
        let result = await (await this.dbConnection).collection('items').find({}).toArray();
        return result
    }

    DeleteItem = async (id: string) => {
        console.log(new ObjectId(id))
        let result = await (await this.dbConnection).collection('items').deleteOne({_id: {$eq: new ObjectId(id)}});
        return result
    } 
}