import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const uploadimage = async (req, res) => {
  const { file, fileName } = req.body;

  if (!file || !fileName) {
    console.log("Missing data:", { file: !!file, fileName: !!fileName });
    return res.status(400).json({ error: "Missing file or fileName" });
  }

  console.log("Received fileName:", fileName);
  console.log("Base64 preview:", file.slice(0, 50)); // log first 50 chars

  try {
    const formData = new URLSearchParams();
    formData.append("image", file);
    formData.append("name", fileName);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const imageUrl = response.data.data.url;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("ImgBB Upload Error:", error.response?.data || error.message);
    res.status(500).json({ error: "File upload failed" });
  }
};
