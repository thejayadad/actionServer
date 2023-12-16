import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import cloudinary from 'cloudinary';
import crypto from 'crypto';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export async function savePhotosToLocal(files) {
  const multipleBuffersPromise = files.map(async (file) => {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = crypto.randomUUID();
    const ext = file.type.split('/')[1];
    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `/${name}.${ext}`);

    await fs.writeFile(uploadDir, buffer);
    console.log(tempDir);

    return { filepath: uploadDir };
  });

  return Promise.all(multipleBuffersPromise);
}

export async function uploadToCloudinary(files, userId) {
  try {
    const savedFiles = await savePhotosToLocal(files);

    const cloudinaryUploadPromises = savedFiles.map(async (savedFile) => {
      const result = await cloudinary.uploader.upload(savedFile.filepath, {
        folder: `user_${userId}/uploads`
      });

      console.log('Cloudinary Upload Result:', result);

    });

    await Promise.all(cloudinaryUploadPromises);

    // Cleanup: Delete local files after Cloudinary upload
    const cleanupPromises = savedFiles.map(async (savedFile) => {
      await fs.unlink(savedFile.filepath);
      console.log('Local file deleted:', savedFile.filepath);
    });

    await Promise.all(cleanupPromises);
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    throw error; 
  }
}
