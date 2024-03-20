import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: 'dareqzl9b',      
  api_key: '196688238714286', 
  api_secret: '6CAv8hajTVX5R_joWTnPYeI6_Dk' 
});

const uploadOnCloudinary = async (filePath) => {
    try{
        if(!filePath) return null
       const response = await cloudinary.uploader.upload(filePath,{ resource_type:"auto" } );
       console.log(response.url)
       fs.unlinkSync(filePath)
        return response
    }
    catch(err){
        return null
    }

}

export default uploadOnCloudinary