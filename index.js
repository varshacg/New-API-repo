const express = require('express');
const mongoose =require('mongoose');
const User=require('./models/User');
const app = express();
const port = 3000;

app.use(express.json());
/* const users=[
  {id:1,name:'anshika'},
  {id:2,name:'babita'},
  {id:4,name:'vashnavi'},
  {id:5,name:'komal'}
]; */
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.error("Connection error:",err));

app.get('/users', async(req, res) => {
  try{
    const users=await User.find();
    res.send(users);
  }catch(err){
    res.status(500).send(err.message);
  }
   /* const userid=parseInt(req.query.id);
   const user=users.find(u=>u.id===userid);
   res.send({Name:user.name}); */
});

app.get('/users/:id',async(req,res)=>{
  try{
    const userId=parseInt(req.params.id);
    const user=await User.findOne({id:userId});
    res.send(user);
  }catch{
    res.status(500).json({error:error.message});
  }
})

/* app.get('/users', async(req, res) => {
  try{
    const id=req.query.id;
    const users=await User.findById(id);
    res.send({Name:user.name});
  }catch(err){
    res.status(500).send(err.message);
  }
   
}); */

app.post('/addusers',async(req,res)=>{
  try{
    const newUser=new User({
      id:req.body.id,
      name:req.body.name
    });
    await newUser.save();
    res.status(201).send('User added');
  }catch(err){
    res.status(400).send(err.message);
  }
});
/* app.post('/addusers', (req, res) => {
  console.log('.......',req.body);
  res.send({
    id:3,
    name:'varsha',
    ...req.body
  });
}); */

/* app.put('/updateusers/:id', (req, res) => {
  console.log('.......',req.body);
  const userid=parseInt(req.params.id);
  const newName=req.body.name;

  const user=users.find(u=>u.id===userid);
  res.send(`user with id ${userid} updated to name:${newName}`);
  
});

app.delete('/deleteusers/:id', (req, res) => {
  console.log('.......',req.body);
  const userid=parseInt(req.params.id);
  

  const user=users.find(u=>u.id===userid);
  res.send(`user with id ${userid} deleted `);
  
}) */


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});