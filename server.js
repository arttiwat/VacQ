const express = require('express'); // การใช้งาน express
const dotenv = require('dotenv');  // require dontenv
const connectDB = require('./config/db');

//Route File
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

//Connect to DataBase
dotenv.config({path:'./config/config.env'});
connectDB();



// Load env vars
// dotenv.config({path:'./config/config.env'});

const app =express(); //สร้างตัวแปร app จาก express

app.use(express.json());


// Mount routers
app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments',appointments);

// Run Server
const PORT = process.env.PORT || 5000; //Port ให้ตรง ENV
const server = app.listen(PORT, console.log('Server running in', process.env.MODE_ENV, 'mode on port', PORT));

//Handle Unhandle promise rejection
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & Exit process
    server.close(()=>process.exit(1));
});


// app get function (request,response)

// app.get('/', (req,res) => {
//     // res.send('<h1>Hello from express</h1>'); // show hello
//     // res.send({name:'Brad'}); // send Text
//     // res.json({name:'Brad'}); // send JSON
//     // res.sendStatus(400); // send status code
//     // res.status(400).json({success:false}); // send status+JSON
//     res.status(200).json({sucess:true, data:{id:1}}); // response OK
// });

// app.get('/api/v1/hospitals', (req,res) => {
//     res.status(200).json({success:true, msg:'Show all Hospitals'});
// });

// app.get('/api/v1/hospitals/:id', (req,res) => {
//     res.status(200).json({success:true, msg:'Show Hospital ${req.params.id}'});
// });

// app.post('/api/v1/hospitals', (req,res) => {
//     res.status(200).json({success:true, msg:'Create new Hospitals'});
// });

// app.put('/api/v1/hospitals/:id', (req,res) => {
//     res.status(200).json({success:true, msg:'Update Hospital ${req.params.id}'});
// });

// app.delete('/api/v1/hospitals/:id', (req,res) => {
//     res.status(200).json({success:true, msg:'Delete Hospital $(req.params.id}'});
// });