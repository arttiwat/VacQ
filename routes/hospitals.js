const express = require('express');
const {getHospitals,createHospital,deleteHospital,getHospital,updateHospital} = require('../controllers/hospitals');

const router = express.Router();

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).delete(deleteHospital).put(updateHospital);
// // const app = express();

// Function
// router.get('/', (req,res) => {
//     res.status(200).json({success:true, msg:'Show all Hospitals'});
// });

// router.get('/:id', (req,res) => {
//     res.status(200).json({success:true, msg:'Show Hospital ${req.params.id}'});
// });

// router.post('/', (req,res) => {
//     res.status(200).json({success:true, msg:'Create new Hospitals'});
// });

// router.put('/:id', (req,res) => {
//     res.status(200).json({success:true, msg:'Update Hospital ${req.params.id}'});
// });

// router.delete('/:id', (req,res) => {
//     res.status(200).json({success:true, msg:'Delete Hospital $(req.params.id}'});
// });

module.exports=router;