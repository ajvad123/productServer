const mongoose=require("mongoose")

const subcatSchema= new mongoose.Schema({

    cat:{
        type:String,
        required:true
    },
    subCat:{
        type:String,
        required:true
    }
})

const subcategories=mongoose.model('subcategories',subcatSchema)


module.exports=subcategories