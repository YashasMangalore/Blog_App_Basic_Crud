import express from "express"
import cors from "cors"
import { v4 as uuidv4 } from "uuid"

const app = express()

app.use(express.json())
app.use(cors())

let blogs = [
  {
    id: uuidv4(),
    title: "Understanding JavaScript Closures",
    author: "John Doe",
    content:
      "Closures are a powerful feature in JavaScript. They allow a function to access variables from its outer scope...",
    datePublished: "2024-11-01",
  },
  {
    id: uuidv4(),
    title: "A Beginner's Guide to Spring Boot",
    author: "Jane Smith",
    content:
      "Spring Boot simplifies the development of Java-based applications by providing a framework that reduces boilerplate code...",
    datePublished: "2024-10-15",
  },
  {
    id: uuidv4(),
    title: "Mastering React Hooks",
    author: "Alex Johnson",
    content:
      "React Hooks are functions that let you use state and other React features without writing a class...",
    datePublished: "2024-11-10",
  },
  {
    id: uuidv4(),
    title: "Understanding RESTful APIs",
    author: "Emily Brown",
    content:
      "RESTful APIs provide a way to communicate between client and server using HTTP methods such as GET, POST, PUT, and DELETE...",
    datePublished: "2024-09-20",
  },
  {
    id: uuidv4(),
    title: "Demystifying CSS Grid Layout",
    author: "Chris Green",
    content:
      "CSS Grid Layout is a two-dimensional layout system for the web. It lets you design web pages with rows and columns...",
    datePublished: "2024-08-30",
  },
];

app.get("/blogs", (req, res) => {
    res.json(blogs)
})

app.post("/newBlogs", (req, res) => {
  blogs.push({...req.body, id:uuidv4()})
  res.status(200).json({msg:"blog added"})
})

app.delete("/delete/:id", (req, res) => {//here id is written as a key
  // console.log(req.params.id)

  const filteredBlogs = blogs.filter((item) => {
    return item.id!=req.params.id
  })

  // console.log("blogs");
  // console.log(filteredBlogs);

  blogs = filteredBlogs
  
  res.status(200).json(filteredBlogs)
})

app.get("/edit/:id", (req, res) => {
  const id = req.params.id
  let foundBlog = blogs.find((item) => {
    return item.id==id
  })
  res.json(foundBlog)
})

app.post("/edit/:id", (req, res) => {
  const id=req.params.id
  const { author, title, datePublished, content } = req.body
  
  const foundBlog = blogs.find((item) => {
    return item.id == id;
  })

  foundBlog.title = title
  foundBlog.content = content
  foundBlog.author = author
  foundBlog.datePublished=datePublished

  res.status(200).json({msg:"Edited successfully"})
})

app.listen(8080, () => {
    console.log("Server is running in 8080 port")
})