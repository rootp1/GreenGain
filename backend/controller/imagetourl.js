import axios from "axios";
import dotenv from "dotenv";
import validator from "validator";
dotenv.config();
export const uploadimage = async (req, res) => {
  const { file, fileName } = req.body;
  if (!file || !fileName) {
    return res.status(400).json({ error: "Missing file or fileName" });
  }
  const sanitizedFileName = validator.escape(validator.trim(fileName));
  if (!sanitizedFileName || sanitizedFileName.length > 255) {
    return res.status(400).json({ error: "Invalid file name" });
  }
  const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
  if (!base64Regex.test(file)) {
    return res.status(400).json({ error: "Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed." });
  }
  const fileSizeBytes = (file.length * 3) / 4;
  const maxSizeBytes = 10 * 1024 * 1024; 
  if (fileSizeBytes > maxSizeBytes) {
    return res.status(400).json({ error: "File too large. Maximum size is 10MB." });
  }
  try {
    const formData = new URLSearchParams();
    formData.append("image", file);
    formData.append("name", sanitizedFileName);
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000, 
      }
    );
    if (!response.data?.data?.url) {
      return res.status(500).json({ error: "Invalid response from image service" });
    }
    const imageUrl = response.data.data.url;
    if (!validator.isURL(imageUrl)) {
      return res.status(500).json({ error: "Invalid URL returned from image service" });
    }
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("ImgBB Upload Error:", error.response?.status, error.message);
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ error: "Upload timeout. Please try again." });
    }
    res.status(500).json({ error: "File upload failed" });
  }
};
