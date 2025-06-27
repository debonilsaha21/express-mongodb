const mongoose = require('mongoose');
//requiring local variables
const Chat = require("./models/chat.js");
//mongodb server connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
};
main()
    .then(() => { console.log("Mongodb connected") })
    .catch((err) => { console.log(err) });

//adding data
let allChats = [
    {
        from: "debonil",
        to: "adam",
        msg: "where is eve",
        created_at: new Date(),
    },
    {
        from: "adam",
        to: "eve",
        msg: "Book an appointment ",
        created_at: new Date(),
    },
    {
        from: "rahul",
        to: "adam",
        msg: "Bring your family or friends! ",
        created_at: new Date(),
    },
    {
        from: "debonil",
        to: "eve",
        msg: "For more information, visit our website",
        created_at: new Date(),
    },
    {
        from: "debonil",
        to: "rahul",
        msg: "I just left you a voicemail",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);


//If our database gets deleted the we have to re-run this file node init.js
