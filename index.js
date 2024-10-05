const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const {v4 :uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.listen(port,()=>{
   console.log(`app listen port ${port}`);
});

let posts = [{
    id: uuidv4(),
    username: "haidarChoudhary",
    content : "I have comlete Web development"
},
{
    id: uuidv4(),
    username: "shradhakhapra",
    content : "I Love Teaching"
},
{
    id: uuidv4(),
    username: "karan",
    content : "I Got my 1st internship"
}
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username, content} = req.body; 
    posts.push({id, username, content});
    res.redirect("/posts");
});
app.get("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("view.ejs", {post});
});
app.get("/posts/:id/edit", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs", {post});
});
app.patch("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id===p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});
// app.get("/posts/:id/delete", (req,res)=>{      //To show Delete Post
//     let { id } = req.params;
//     let post = posts.find((p)=>id===p.id);
//     res.render("delete.ejs", {post});
// });
app.delete("/posts/:id", (req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
});
