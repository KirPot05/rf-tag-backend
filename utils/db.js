import mongoose from "mongoose";


export default function dbConnect(){
    
    try{

        const dbUrl = process.env.MONGO_URL;
        
        mongoose.connect(dbUrl)
            .then(() => {
                console.log("Connected to Database")})
            .catch((err)=> console.log(err));

    } catch(err){
        console.log(err);
    }

}