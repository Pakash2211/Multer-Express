const express = require('express');
const fs = require('fs');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + file.originalname;
  
      cb(null,file.fieldname+ "-"+ uniqueSuffix )
    }
  })
  
  const upload = multer({ storage: storage })




app.get('/',(req,res)=>{
    fs.readFile('index.html',{encoding : 'utf-8'},(err,data)=>{
        if(err){
           return res.status(404).send("")
        }
         res.send(data);
    })
})
app.post('/upload',upload.single('avatar') , (req,res)=>{
    res.send("upload done")
})


app.listen(8099);



