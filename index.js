import express from "express";


const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


let posts = [];
let idCounter = 1;


// Home - View all posts
app.get("/", (req, res) => {
res.render("index.ejs", { posts });
});


// Form to create post
app.get("/new", (req, res) => {
res.render("new.ejs");
});


// Create post
app.post("/new", (req, res) => {
const { title, content } = req.body;
posts.push({ id: idCounter++, title, content });
res.redirect("/");
});


// Edit form
app.get("/edit/:id", (req, res) => {
const post = posts.find(p => p.id == req.params.id);
res.render("edit.ejs", { post });
});


// Update post
app.post("/edit/:id", (req, res) => {
const post = posts.find(p => p.id == req.params.id);
post.title = req.body.title;
post.content = req.body.content;
res.redirect("/");
});


// Delete post
app.post("/delete/:id", (req, res) => {
posts = posts.filter(p => p.id != req.params.id);
res.redirect("/");
});


app.listen(port, () => {
console.log(`Server running on port ${port}`);
});