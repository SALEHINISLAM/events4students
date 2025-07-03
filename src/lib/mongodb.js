import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_MongoURI_KEY;
const options = {};

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your Mongo URI .');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;