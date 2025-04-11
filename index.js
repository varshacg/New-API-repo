const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const users=[
  {id:1,name:'anshika'},
  {id:2,name:'babita'},
  {id:4,name:'vashnavi'},
  {id:5,name:'komal'}
];

app.get('/users', (req, res) => {
   const userid=parseInt(req.query.id);
   const user=users.find(u=>u.id===userid);
   res.send({Name:user.name});
});

app.post('/addusers', (req, res) => {
  console.log('.......',req.body);
  res.send({
    id:3,
    name:'varsha',
    ...req.body
  });
});

app.put('/updateusers/:id', (req, res) => {
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
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});