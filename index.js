// require('dotenv').config()
import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
let teaData = []
let nextId = 1
 

// app.get('/',(req,res)=>{
//     res.send("Hello Shivankit")
// })
// app.get('/ice-tea',(req,res)=>{
//     res.send("What ice tea you prefer")
// })

// app.get("/twitter",(req,res)=> {
//     res.send("shivankit Twitter")
// })

app.use(express.json())
app.post('/teas',(req,res) => {
    const {name,price} =req.body
    const newTea = {id: nextId++,name,price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})

app.get('/teas',(req,res)=>{
    res.status(201).send(teaData);
})

//  Get tea with Id

app.get('/teas/:id',(req,res)=>{
   const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(401).send('Tea is not found');
    }
    res.status(200).send(tea);
})

//update Tea 

app.put('/teas/:id',(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(401).send('Tea is not found to update');
    }
    const {name,price} = req.body
    tea.name =name;
    tea.price = price;

    res.status(200).send(tea);
})

app.delete('/teas/:id',(req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    if(index == -1){
        return res.status(404).send("tea not found.")
    }

    teaData.splice(index,1)
    return res.status(204).send('deleted');
})

app.listen(port,()=>{
    console.log(`App is listening on ${port}`);
})