const jwt = require('jsonwebtoken')

const jwtMiddlewareFun = async (req, res, next) => {

    console.log("inside the middleware");

    try{
          const token = req.headers.authorization.split(" ")[1]

        if (token) {
            
            const result=jwt.verify(token,process.env.secret_key)
            req.payload=result.UserId
            next()
        }else{

            res.status(404).json("Please Login First")
        }


    }catch(err){
        res.status(406).json(err)
    }
   
}
    module.exports=jwtMiddlewareFun  