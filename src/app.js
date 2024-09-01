import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
dotenv.config({
    path: './.env'
})
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.route.js'

//routes declaration
app.use("/api/v1/users", userRouter)

const isProduction = process.env.NODE_ENV == "production";

// swagger will server here
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "./utils/swaggerDoc.js"

// Swagger UI options
const options = {
    swaggerOptions: {
      supportedSubmitMethods: []
    }
  };

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));


app.use((err, req, res, next) => {
    if (isProduction) {
        console.error(err.stack);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Something went wrong"
        });
    } else {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            stack: err.stack,
            errors: err.errrors
        });
    }
});


export { app }
