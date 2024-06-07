import { v2 } from "cloudinary";
import app from "./app.js";
import connectTodB from "./db/db.config.js";
const PORT=process.env.PORT || 6005;

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT,async()=>{
    await connectTodB();
    console.log(`listening to port ${PORT}`);
})