import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("IMAGEKIT_PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("IMAGEKIT_URL_ENDPOINT:", process.env.IMAGEKIT_URL_ENDPOINT);

export const uploadimage = async(req, res) => {
    const { file, fileName } = req.body;
    
    try {
        const response = await imagekit.upload({
            file,
            fileName,
            folder: "/uploads",
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "File upload failed" });
    }
}