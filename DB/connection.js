const mongoose=require('mongoose')
require('dotenv').config();
const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB connection Successfully");
    
}).catch((err)=>{
    console.log("MongoDB Connection Failed");
    console.log(err);
    
})