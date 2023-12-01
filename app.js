import "dotenv/config";
import express from 'express';
import session from "express-session";
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";

const CONNECTION_STRING = "mongodb+srv://giuseppi:supersecretpassword@cluster0.qudbiop.mongodb.net/?retryWrites=true&w=majority" || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
 ));
 const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  
  app.use(
    session(sessionOptions)
  );
  
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);

Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);