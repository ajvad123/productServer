const Users=require('../Model/userModel')
const jwt=require('jsonwebtoken')


exports.userRegistration=async(req,res)=>{    

    console.log(req.body);
    const {Name,Email,Password}=req.body

    console.log("inside the register function");

try{
     const existingUser= await Users.findOne({Email})

    if (existingUser) {

        res.status(401).json("User Already Existing")
        
    }else{
        const newUser=new Users({
            Name,Email,Password
        })
        await newUser.save()
        res.status(201).json(newUser)
    }


}catch(err){
    res.status(404).json(err)
    
}
   
 
}


exports.userLogin=async(req,res)=>{

    const{Email,Password}=req.body

    const existingUser= await Users.findOne({Email,Password})

    if (existingUser) {
        
        const token=jwt.sign({Email:existingUser.Email,Password:existingUser.Password,UserId:existingUser._id},process.env.secret_key)
        console.log(token);
        const rest={token,user:existingUser.Name}
        res.status(200).json(rest)
    }else{
        res.status(404).json("Invalid username and password")
    }
}