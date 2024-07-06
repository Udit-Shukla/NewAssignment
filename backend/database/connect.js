const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.MONGO_URL;

// mongo db connection 
const connect = async ()=>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connected to the database");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connect;