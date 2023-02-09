const Hospital = require('../models/Hospitals');
//@desc Get all Hospitals
//@route Get /api/v1/hospitals
//@access Public

// exports.getHospitals=(req,res,next)=>{
//     res.status(200).json({success:true, msg:'Show all Hospitals'});
// };

exports.getHospitals= async(req,res,next)=>{
    try{
        const hospitals = await Hospital.find();

        res.status(200).json({success:true,count:hospitals.length,data:hospitals});
    }catch(err){
        res.status(400).json({success:false});
    }
};

// exports.getHospital = (req,res,next) => {
//     res.status(200).json({success:true, msg:`Show Hospital ${req.params.id}`});
// };

exports.getHospital = async(req,res,next) => {
    try{
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true,data:hospital});

    }catch(err){
        res.status(400).json({success:false});
    }
};

// exports.getHospital = async(req,res,next) => {
//     try{
//         const hospitals = await Hospital.find();

//         res.status(200).json({success:true,count:hospitals.length, data:hospitals});
//     } catch(err){
//         res.status(400).json({success:false});
//     }
// };

// exports.createHospital = (req,res,next)=>{
//     // console.log(req,body);
    
//     res.status(200).json({success:true, msg:'Create new Hospitals'});
// };

exports.createHospital = async (req,res,next)=>{
    const hospital = await Hospital.create(req.body);
    res.status(201).json({
        success: true,
        data:hospital
    });
}

// exports.updateHospital = (req,res,next) => {
//     res.status(200).json({success:true, msg:`Update Hospital ${req.params.id}`});
// };

exports.updateHospital = async (req,res,next) => {
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        });

        if(!hospital){
            return res.status(400).json({success:false});
        }
        
        res.status(200).json({success:true,data:hospital});
    }catch(err){
        res.status(400).json({success:false});
    }
};

// exports.deleteHospital = (req,res,next) => {
//     res.status(200).json({success:true, msg:`Delete Hospital ${req.params.id}`});
// };

exports.deleteHospital = async (req,res,next) => {
    try{
        const hospital = await Hospital.findByIdAndDelete(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};
