import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./utils/swaggerDoc.js";

// Load environment variables
dotenv.config({ path: './.env' });

// Initialize the Express application
const app = express();

// Middleware for Cross-Origin Resource Sharing
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Security middleware
app.use(helmet());
app.use(helmet.hidePoweredBy()); // Hide the "X-Powered-By" header

// Set Cross-Origin Resource Policy header
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// Serve static files from the public directory
app.use(express.static("public"));

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser()); // Parse cookies

// Import routes
import relationRouter from './routes/relation.route.js';
import userRouter from './routes/user.route.js';
import peopleRouter from "./routes/people.route.js";
import featureRouter from "./routes/feature.route.js";

// Declare routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/relation", relationRouter);
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/feature", featureRouter);

// Health check endpoint
app.get("/keep-alive", async (req, res) => {
    res.json({ success: "true" });
});

// Error handling middleware
const isProduction = process.env.NODE_ENV === "production";
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: isProduction ? err.message || "Something went wrong" : err.message,
        ...(isProduction ? {} : { stack: err.stack, errors: err.errors }),
    });
});

// Swagger UI setup
const swaggerOptions = {
    swaggerOptions: {
        supportedSubmitMethods: [],
    },
};
// Uncomment the following line to enable Swagger UI
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerOptions));

export { app };
