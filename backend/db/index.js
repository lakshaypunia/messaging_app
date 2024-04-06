const mongoose = require("mongoose")
const { number } = require("zod")
mongoose.connect("mongodb+srv://ashgamer7885:abjd234dhjhfh@cluster0.54kdedl.mongodb.net/messagingapp")

const messageidschema = mongoose.Schema({
    msgid : Number
})

const msgidmodel = mongoose.model("msgid" , messageidschema)

const messageschema = mongoose.Schema({
    userid : String,
    recieverid :String,
    msgid : {type : Number, default: 0},
    received : { type: Boolean,default: false },
    send : { type: Boolean, default : false},
    message : String,

})

const usermodel = mongoose.model("user" , messageschema)

module.exports = {usermodel,msgidmodel}