const express =requires('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.listen(3000)