import { connectToDatabase } from '../testing';
import { Db, ObjectId } from "mongodb";

export class userService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    Login = async (email: string) => {
        let result = await (await this.dbConnection).collection('users').find({email: email}).toArray();
        return result
    }

    GetAccount = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('users').find({_id: new ObjectId(id)}).toArray();
        return result 
    }

    UpdateAccount = async (id: ObjectId | undefined, username: string | string[], contactNumber: string | string[], photo: string | null, address1: string | string[], address2: string | string[], postalCode: string | string[], city: string | string[], state: string | string[], country: string | string[]) => {
        let result = await (await this.dbConnection).collection('users').updateOne({_id: new ObjectId(id)}, {$set: {username: username, contactNumber: contactNumber, photo: photo, address1: address1, address2: address2, postalCode: postalCode, city: city, state: state, country: country}})
        return result
    }

    ChangePassword = async (id: ObjectId | undefined, changedPassword: string) => {     
        let result = await (await this.dbConnection).collection('users').updateOne({_id: new ObjectId(id)}, {$set: {password: changedPassword}})
        return result
    }

    PatchAccountAdmin = async (user_id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('users').updateOne({_id: new ObjectId(user_id)}, {$set: {role: 'admin'}})
        return result
    }
}