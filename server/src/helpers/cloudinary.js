import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


cloudinary.config({
  cloud_name: "djf79gdgc",
  api_key: "238582856796925",
  api_secret: "dmkblev9lnz5PtMsF406W39VEYc"
});

const storage = new multer.memoryStorage();

export default async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto"
  });

  return result;
}

export const upload = multer({ storage });
