const mongoose=require("mongoose")


const categorySchema=new mongoose.Schema({

     NCategory: {
    id: Number,
    name: String
  }
})


const Categories=mongoose.model('Categories',categorySchema)


module.exports=Categories    