const express=require("express")
const app=express();
const dbConnect=require("./db");
const createUser=require("./routes/createUser")
const cors=require("cors");
const displayData=require("./routes/displayData")

const port=3000;
app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use((req,res,next)=>{
    res.setHeader("Accsess-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Accsess-Control-Allow-Origin",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(cors());

app.use(express.json());

app.use("/api",createUser);
app.use("/api",displayData);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


dbConnect();