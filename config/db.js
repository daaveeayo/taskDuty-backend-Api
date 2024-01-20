const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI

const connect = async ()=>{
    try {
        await mongoose.connect(DB_URI)
        console.log('mongoDB connected successfully');
    } catch (error) {
        console.log(error);
    }
}


module.exports = connect