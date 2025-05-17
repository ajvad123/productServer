const multer= require('multer')


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{

        callback(null,"./Uploads")

    },
    filename:(req,file,callback)=>{

        console.log(file);

        callback(null,`Img${Date.now()}-${file.originalname}`)

    }
})


const fileFilter=(req,file,callback)=>{

    console.log(file);

    if(file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"||file.mimetype=="image/png"){
        callback(null,true)
       }
    else{
        callback(null,false)
        return callback(new Error("Please Upload file with extentions like 'jpg,png,jpeg"))
    }
}


const multerConfig=multer({
    storage,
    fileFilter
})


module.exports=multerConfig