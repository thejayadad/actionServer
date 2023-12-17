'use server'
// 'use server'
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
  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = crypto.randomUUID();
      const ext = file.type.split('/')[1]; 
      const tempDir = os.tmpdir(); 
      const uploadDir = path.join(tempDir, `${name}.${ext}`);
      
      return fs.writeFile(uploadDir, buffer).then(() => {
        console.log('File saved to local:', uploadDir);
        return { filepath: uploadDir };
      });
    })
  );

  return await Promise.all(multipleBuffersPromise);
}

export async function uploadToCloudinary(files, userId) {
    const newFiles = await savePhotosToLocal(files);
    const multiplePhotosPromise = newFiles.map((file) =>
        cloudinary.v2.uploader.upload(file.filepath, {
            folder: `next_gallery/${userId}`
        })
    );
    
    const results = await Promise.all(multiplePhotosPromise);

    // Cleanup: Delete local files after uploading to Cloudinary
    await Promise.all(newFiles.map((file) => fs.unlink(file.filepath)));

    return results;
}
