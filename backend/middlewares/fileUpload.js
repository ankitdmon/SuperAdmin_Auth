const {v4}=require('uuid')
const multer=require('multer')


module.exports.fileUpload=(destinationPath,fieldName)=>{

    const storage=multer.diskStorage({
        
        destination:(req,file,callback)=>{
        callback(null,destinationPath)
        },
        filename:(req,file,callback)=>{
            if(!file){
                return req.err="File Not selected"
            }else{
    
                callback(null,v4()+'-'+file.originalname.replace(' ','').toLowerCase());
            }
        },
    })
    
    
    return multer({storage}).single(fieldName);
    
    
}