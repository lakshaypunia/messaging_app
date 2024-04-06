const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { usermodel, msgidmodel } = require("./db")

const app = express()
app.use(express.json())
app.use(cors())

async function chechmsgidavailaibility(){
    const msgid =await msgidmodel.findOne()

    if(!msgid){
        newmsgid = new msgidmodel({
        msgid : 0})
        newmsgid.save()
    }
    return
}
chechmsgidavailaibility().then(() =>{
    return
})

app.post("/message" , async function(req,res){
    const userid = req.body.userid
    const recieverid = req.body.recieverid
    const messages = await usermodel.find({userid:userid,recieverid:recieverid});
    messages.sort((a, b) => (a.msgid > b.msgid) ? 1 : ((b.msgid > a.msgid) ? -1 : 0));
    res.json({messages})
    
})

app.post("/send", function(req, res){
    const userid = req.body.userid
    const recieverid = req.body.recieverid
    const message = req.body.message


    async function updatemsgid(){
        const msgid = await msgidmodel.findOne()

        const updatedmsgid = msgid.msgid + 1 

        await msgidmodel.updateOne({},{msgid : updatedmsgid})

        const newmsgid = await msgidmodel.findOne()
        return newmsgid.msgid

    }
    updatemsgid().then(msgidvalue => {
        const sentmessage = new usermodel({
            msgid : msgidvalue,
            recieverid : recieverid,
            userid : userid,
            received  : false,
            send : true,
            message : message
        })
        sentmessage.save()
    
        const recievedmessage = new usermodel({
            msgid : msgidvalue,
            userid : recieverid,
            recieverid : userid,
            received  : true,
            send : false,
            message : message
    
        })

        recievedmessage.save()
        
    })

    res.json({
        msg : "msg sent",
        userid : userid,
        message :message
    })

})

app.listen(3000)