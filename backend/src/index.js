import { app } from './app.js';
import connectDB from "./database/config.js";

// cron-task
import keepAlive from "./cron/keepAlive.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
