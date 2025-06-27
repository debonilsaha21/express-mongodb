const express = require("express");
const mongoose = require('mongoose');
const app = express();
const path = require("path");
const methodOverride = require('method-override')

//requiring local variables
const Chat = require("./models/chat.js");

//mongodb server connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
};
main()
    .then(() => { console.log("Mongodb connected") })
    .catch((err) => { console.log(err) });

//set ejs
app.set("view engine", "ejs");
//set path for views folder
app.set("views", path.join(__dirname, "views"));
//we are using method_override
app.use(methodOverride('_method'));
//parse post data from req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

//express routes
//index route /chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

//create chat get then post
app.get("/chats/new", (req, res) => {
    res.render("create.ejs");
});

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save()
        .then((res) => { console.log("chat saved") })
        .catch((err) => { console.log(err) });
    res.redirect("/chats");
});

//update chat get route then patch route
app.get("/chats/edit/:id", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

app.put("/chats/edit/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let chat = await Chat.findByIdAndUpdate(
        id, { msg: newMsg }, {
        runValidators: true, new: true
    });
    res.redirect("/chats");
});

//delete route
app.delete("/chats/delete/:id", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});



















//Starting the server    
app.listen(8080, () => {
    console.log("Connection active");
});