
const mongoose = require("mongoose")
const { number } = require("zod")
mongoose.connect("mongodb+srv://ashgamer7885:abjd234dhjhfh@cluster0.54kdedl.mongodb.net/messagingapp")

const messageidschema = mongoose.Schema({
    msgid : Number
})

const msgidmodel = mongoose.model("msgid" , messageidschema)


const messageschema = mongoose.Schema({
    userid : String,
    msgid : {type : Number, default: 0},
    recieverid : String,
    received : { type: Boolean,default: false },
    send : { type: Boolean, default : false},
    message : String,

})

// messageschema.pre('save', async function(next) {
//     try {
//         // Increment the field by one
//         this.msgid += 1;
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });


const usermodel = mongoose.model("user" , messageschema)

module.exports = {usermodel,msgidmodel}