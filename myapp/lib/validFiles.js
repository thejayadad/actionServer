
export const validFiles = (file) => {
    const imgTypes = ["image/jpeg", "image/png"]

    if(!file.type.startsWith('image')){
        return {
            status: 'error',
            errMsg: `This is not a Image - ${file.type}`,
            title: file.name,
            
        }
    }

    return {
        status: 'success',
        title: file.name.replace(/.(jpeg||jpg||png)$/gi,''),
        tags: ["thejayadad"],
        public: false,
        imgUrl: URL.createObjectURL(file),
        fileUpload: file
    }
}