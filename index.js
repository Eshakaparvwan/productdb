const express=require('express');
const mongoose=require('mongoose')
const app=express();
const dbconfig=require('./databse.config.js')
mongoose.Promise=global.Promise;
mongoose.connect(dbconfig.url , {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("sucessful")
}).catch(err=>{
    console.log("ERROR")
    console.log(err)
    process.exit()
})


//connect to mongodb 
// mongoose.connect("mongodb.//localhost/proddb");
// mongoose.Promise=global.Promise;
app.use(express.urlencoded({ extended : true }));
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({"message":"Welcome , this is HOME PAGE"})
})
const route=require('./app/route.js')(app);

app.listen(4000)