const { Timestamp } = require("mongodb");
const mongoose= require("mongoose");


const contactSchema= mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            reuires:true,
            ref:"User",
        },
        name: {
            type: String,
            required: [true,"Please add the contacts"],
        },
        email: {
            type: String,
            reuired:[true, "Please add contact email address"],
        },
        phone: {
            type: String,
            required: [true,"Please add the contacts phone number"],
        },
    },
    {
        timestamps: true,
    }
);
module.exports =mongoose.model("Contacts",contactSchema);