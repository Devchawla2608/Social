const User = require('../../../models/User.js')
const jwt = require('jsonwebtoken');
module.exports.createSession = async function (req, res) {
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).send({
                message:"Invalid username or password",
            })
        } 
        return res.status(200).send({
            message:"Here is your token keep it safe",
            data:{
                token:jwt.sign({user:user} , 'codeial' , {expiresIn:'100000'}),
            }
        })
    }catch(err){
        console.log("*******" , err);
        return res.status(500).send({
            message:"Internal Server Error"
        });
    }
};