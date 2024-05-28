const auth=(req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,"privateKey");
            req.userId=user.id;
        }
        else{
            res.status(401).json({message:"Unauthorized user"});

        }
        next();

    }
    catch(error){

        console.log("Error in auth catch",error)
    }
}
module.exports=auth;