let {nanoid}=require("nanoid")
let URL=require("../models/url")
const handleGenrateShortUrl=async(req,res)=>{
    let shortId=nanoid(8);
    let body=req.body;
    if(!body){
        return res.status(400).json({error:"url is require"})
    }
    URL.create({
        shortId,
        redirectUrl:body.url,
        visitHistory:[],
    })
    return res.json({id:shortId})

}
module.exports={handleGenrateShortUrl}