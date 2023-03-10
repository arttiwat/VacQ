const Hospital = require('../models/Hospitals');
//@desc Get all Hospitals
//@route Get /api/v1/hospitals
//@access Public

// exports.getHospitals=(req,res,next)=>{
//     res.status(200).json({success:true, msg:'Show all Hospitals'});
// };

exports.getHospitals= async(req,res,next)=>{

    let query;
    
    //Copy eq,query
    const reqQuery = {...req.query};

    //Field to exclude
    const removeField = ['select','sort','page','limit'];

    //Loop over remove field and delete them from reqQuery
    removeField.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    //Create query string
    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);
    //finding resource
    query = Hospital.find(JSON.parse(queryStr)).populate('appointments');
    // query = Hospital.find(JSON.parse(queryStr));

    //Select Field
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else{
        query = query.sort('-createAt');
    }

    //Pagination
    const page = parseInt(req.query.page,10)||1;
    const limit = parseInt(req.query.limit,10)||25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    try{
        const total = await Hospital.countDocuments();
        query = query.skip(startIndex).limit(limit);

        //Execute query
        const hospitals = await query;

        //Pagination result
        const pagination = {};
        if (endIndex < total){
            pagination.next = {page:page+1,limit}

        }

        if (startIndex > 0){
            pagination.prev = {page:page-1,limit}
        }

        res.status(200).json({success:true,count:hospitals.length, pagination,data:hospitals});
    }catch(err){
        res.status(400).json({success:false});
        console.log(err);
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
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false});
        }
        hospital.remove();
        res.status(200).json({success:true, data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};

