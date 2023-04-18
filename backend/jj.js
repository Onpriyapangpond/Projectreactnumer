
const express = require("express") 
const cors = require("cors")
const bodyParser= require("body-parser")
const mongoose = require("mongoose")
const swaggerJsdoc =require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
var jwt = require('jsonwebtoken');


const swaggerDocument = require('./swagger.json');

const app = express(); //จัดการ req res ตัวหลังบ้าน
app.use(cors()); //การทำข้าม domain ให้ทำได้
app.use(bodyParser.json()); 

mongoose.connect("mongodb://localhost:27017/Reactdb"); //เชื่อม mongo React databse
const db = mongoose.connection; //เก็บการเชื่ิอม
db.on("error", console.error.bind(console, "connection error: "));

db.on("open", function () { //ถ้าเปิดได้
  console.log("Connected successfully");
});

const BisectionSchema = new mongoose.Schema({ //การสร้างไดเรกทอรี่ model Schema=reactdb เพื่อเก็บใน name 
  Fxxx: {
    type: String,  // type
    required: true,
  },
  Xl:{
    type: String,  // type
    required: true,
  },
  Xr:{
    type: String,  // type
    required: true,
  }
});

const TaylorSchema = new mongoose.Schema({ //การสร้างไดเรกทอรี่ model Schema=reactdb เพื่อเก็บใน name 
    Fxxx: {
      type: String,  // type
      required: true,
    }
  });

  const OnepointSchema = new mongoose.Schema({ //การสร้างไดเรกทอรี่ model Schema=reactdb เพื่อเก็บใน name 
    Fxxx: {
      type: String,  // type
      required: true,
    },
    X1:{
        type: String,  // type
        required: true,
      }
  });
const User = mongoose.model("Tablemango", TaylorSchema ); //mg ช่วยเข้าถึง table นี้ scกำหนดสำหรับmodel นั้น ตัวแปรใช้ได้ทุกฟังชั่น
const BisectionModel = mongoose.model("bitable", BisectionSchema);
const OnepointModel = mongoose.model("onepoints", OnepointSchema);

app.get("/j", async (req, res) => { //get j ทำอะไร res= objectส่งไปหน้าบ้าน
    console.log("eoe");
    let Count = await User.find({})  //ทำบรรทัดนี้เสร็จก่อน ค่อยทำบรรทัดอื่น countที่ fetch ข้อมูลทั้งหมดที่เป็น array
    let rannum = parseInt(Math.floor(Math.random()*Count.length))%Count.length //สุ่มเลข*เลขlength ของcount
    console.log(rannum); 
    console.log(Count[rannum].toJSON().Fxxx); //ข้อมูลตำแหน่ง
    res.send(Count[rannum].toJSON().Fxxx) //ส่งกลับไป
});

app.get("/bisection",authorization, async (req, res) => { //get j ทำอะไร res= objectส่งไปหน้าบ้าน
    console.log("eoe");
    let Count = await BisectionModel.find({}) 
    console.log(Count);
    res.send(Count) //ส่งกลับไป
});

app.get("/onepoint", async (req, res) => { //get j ทำอะไร res= objectส่งไปหน้าบ้าน
    console.log("eoe");
    let Count = await OnepointModel.find({}) 
    console.log(Count);
    res.send(Count) //ส่งกลับไป
});

app.post("/j", (req, res) => { 
    console.log(req.body); //oject body ว่าง ไว้บรรจุreq
     User.collection.insertOne( {Fxxx : req.body.Fxxx } ) //เพิ่มตามคีย์นี้ในตาราง table
  });
 
  app.post("/bisection", (req, res) => { 
    console.log(req.body); //oject body ว่าง ไว้บรรจุreqx
    BisectionModel.collection.insertOne( {Fxxx : req.body.Fxxx,Xl : req.body.Xl,Xr : req.body.Xr } ) //เพิ่มตามคีย์นี้ในตาราง table
  }); 

  app.get("/gettoken", async (req, res) => { 
    console.log("eoe");
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh'); //fooคือ key แปลงเป็น token 
    res.send(token) //ส่งกลับไป
});

function authorization(req, res, next) {
    console.log(req.headers);
    let token = req.headers["authorization"]; //ดูว่ามีข้อมูลในนี้มั้ย
    if (token === undefined) {
      res.send("don't have authorization");
    } else {
      try {
        
        token = token.split(" ")[1];
        console.log(token);
        let decode = jwt.verify(token, 'shhhhh'); //sh กุญแจ แปลงกลับค่าเดิม
        console.log(decode);
        if (decode.foo === "bar") {
          next();
        } else {
          res.send("pls authen");
        }
      } catch {
        res.send("no correct");
      }
    }
  }
//   const specs = swaggerJsdoc(swaggerDocument );
  app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(3005, () => { //ตั้ง port ให้exprss
  console.log("Start server at port 3005.");
});

module.exports=app



