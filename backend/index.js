import express from "express";
import authRoute from "./routes/authRoute.js";
import treeRoute from "./routes/treesRoute.js";
import imageRoute from "./routes/imageRoute.js"
import session from "express-session"
import passport from "./utils/passport.js";
import cors from "cors";
import ImageKit from "imagekit";




const app=express();
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true,  
}));
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true })); 


app.use("/auth", authRoute);
app.use("/tree",treeRoute);
app.use("/upload",imageRoute);


app.listen(4000, () => {
    console.log(`Server running on http://localhost:4000`);
  });


