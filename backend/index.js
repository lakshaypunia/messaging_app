const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const { usermodel, msgidmodel } = require("./db")




const app = express()
app.use(express.json())
app.use(cors())

// newmsgid = new msgidmodel({
//     msgid : 0
// })

// newmsgid.save()
// const usermiddleware = async function(req,res,next){
//     userid = req.body.userid
//     const userverification = await usermodel.findOne({userid : userid})
//     if (!userverification){
//         res.status(400).json({
//             msg : "invalid userid"
//         })
//     }else{
//         next()
//     }


// }

// const recievermiddleware = async function(req,res,next){
//     recieverid = req.body.recieverid
//     const user = await usermodel.findOne({userid :recieverid})
//     if (!user){
//         res.status(400).json({
//             msg : "invalid recieverid"
//         })
//     }else{
//         next()
//     }


// }

// app.use(usermiddleware)
// app.use(recievermiddleware)



app.post("/message" , async function(req,res){
    const userid = req.body.userid
    const recieverid = req.body.recieverid
    console.log(userid + recieverid)
    const messages = await usermodel.find({userid : userid,recieverid : recieverid},);
    messages.sort((a, b) => (a.msgid > b.msgid) ? 1 : ((b.msgid > a.msgid) ? -1 : 0));
    console.log(messages)
    res.json({messages})
    console.log(messages)
    
})

app.post("/send", function(req, res){
    const userid = req.body.userid
    const recieverid = req.body.recieverid
    const message = req.body.message
    console.log(recieverid)

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
            userid : userid,
            recieverid : recieverid,
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
        userid : userid,recieverid:recieverid,
        message :message
    })

})

app.listen(3000)