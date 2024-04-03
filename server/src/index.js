import app from "./app.js";
import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})


app.get("/", (req,res) => {
  res.json("success")
})

try{
  app.listen(process.env.PORT || 3000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
})
}
catch(err) {
  console.log("db connection failed !!! ", err);
}

