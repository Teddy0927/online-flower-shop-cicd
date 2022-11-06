import express from 'express'
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import formidable from 'formidable';
import { connectToDatabase } from '../testing';
import { v4 } from 'uuid';
import 'dotenv/config';
import nodemailer from 'nodemailer';

import fs from 'fs';
import { ObjectId } from 'mongodb';


const permit = new Bearer({
    query: 'access_token'
});

export const uploadDir = 'uploads';
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 * 1024 ** 2, // the default limit is 200KB,
})

export const userMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = permit.check(req)
    try {
        const payload = jwtSimple.decode(token, process.env.JWT_SECRET!)
        req.user = {
            id: payload
        };        
        next();
    } catch (err) {
        const db = connectToDatabase();
        let username = v4();
        let password = "";
        const newUser = (await (await db).collection('users').insertOne({ username, password })).insertedId;
        
        req.user = {
            id: newUser,
        }
        const payload = {
            newUser
        }
        const jwt = jwtSimple.encode(payload['newUser'], process.env.JWT_SECRET!);
        res.header('TEMP-TOKEN', jwt);

        next();
    }
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user_id = req.user?.id;
    const db = connectToDatabase();
    const adminCheck = await (await db).collection('users').find({_id: new ObjectId(user_id), role: "admin"}).toArray();
    if (adminCheck.length === 1) {
        next()
    } else {
        res.status(401).json('Unauthorized')
    }
}

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})