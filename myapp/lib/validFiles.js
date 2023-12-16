
export const validFiles = (file) => {
    const imgTypes = ["image/jpeg", "image/png"]
    console.log(file)

    if(!file.type.startsWith('image')){
        return {
            status: 'error',
            errMsg: `This is not a Image - ${file.type}`,
            title: file.name,
            imgUrl:'/blank.jpg'
            
        }
    }
    
    if(!imgTypes.includes(file.type)){
        return {
            status: 'error',
            errMsg: 'Wrong ImageFormat',
            title: file.name,
            imgUrl: URL.createObjectURL(file),
            
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