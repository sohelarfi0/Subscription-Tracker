import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI){
    throw new error('please define DB_URI environment variable inside .env.<development/production>.local fordatabase connection');

}

const connectTODatabase=async()=>{
    try{
        await mongoose.connect(DB_URI);

        console.log(`connected to database in ${NODE_ENV} mode`);

    }catch(error){
        console.error('Error connecting to database: ',error);

        process.exit(1);
    }
}


export default connectTODatabase;