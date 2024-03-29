const User = require('../models/User');
//Get token from Model, Create Cookie and Send Response
const sendTokenResponse = (user,statusCode,res)=>{
    //Create Token
    const token = user.getSignedJwtToken();

    const options = {
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV==='production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({success:true,token})
}

// exports.register = (req,res,next)=>{
//     res.status(200).json({success:true});
// }

exports.register = async(req,res,next)=>{

    try{
        const {name, email, password, role} = req.body;

        //Create User
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        //Create Token
        // const token = user.getSignedJwtToken();
        // res.status(200).json({success:true,token});
        sendTokenResponse(user,200,res);


    }catch(err){
        res.status(400).json({success:false});
        console.log(err);
    }
    

};

//@desc     Login User
//@route    POST/api/v1/auth/login
//@access   Public

exports.login = async (req,res,next)=>{
    const {email,password} = req.body;

    //Validate Email & Password
    if(!email || !password){
        return res.status(400).json({success:false,
        msg:'Please Provide an Email & Password'});
    }

    //Check for User
    const user = await 
    User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).json({success:false,
        msg:'Invalid Credentials'});
    }

    //Check if Password Matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({success:false,
        msg:'Invalid Credentials'})

    }

    //Create Token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success:true,token});
    sendTokenResponse(user,200,res);
};

//@desc Get Current Logged in User
//@Route POST /api/v1/auth/me
//@access Private
exports.getMe = async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({success:true,data:user});
};

//Update
// exports.updateHospital = async (req,res,next) => {
//     try{
//         const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators:true
//         });

//         if(!hospital){
//             return res.status(400).json({success:false});
//         }
        
//         res.status(200).json({success:true,data:hospital});
//     }catch(err){
//         res.status(400).json({success:false});
//     }
// };