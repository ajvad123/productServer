const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')

// creating server instance

const productServer=express()

require('./DB/connection')


productServer.use(cors())

productServer.use(express.json())
productServer.use(router)

productServer.use('Uploads',express.static('./Uploads'))

port=4001

productServer.listen(port,()=>{ 
    console.log(`server is running at ${port}`);
    
})

productServer.get('/',(req,res)=>{
    res.status(200).send("<h1>request hit successfully on productServer! </h1>")
})