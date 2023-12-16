
'use server'

import { uploadToCloudinary } from "@/lib/cloudinary"

export async function uploadPhotos(formData, filesUpload){
    try {
        const user = await getServerUser()
        if(!user){
            throw new Error('Unauthorized')
        }
        const files = formData.getAll('files')

        const photos = await uploadToCloudinary(files, user?._id)
    } catch (error) {
        return {errMsg: error.message}
    }
}