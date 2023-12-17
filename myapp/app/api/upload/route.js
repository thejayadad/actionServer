import multer from "multer";
import { NextApiRequest, NextApiResponse } from 'next';
const upload = multer();




export default async function POST(req, res) {
  try {
    console.log(req.files); 
    
    return { success: true };
  } catch (error) {
    console.error('Error during upload:', error);
    res.status(500).json({ errMsg: 'Internal Server Error' });
  }
}
