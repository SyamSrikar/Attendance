import Details from "../models/Details";
const jwt=require('jsonwebtoken')

interface IDetails{
    name:String,
    type:String,
    userId:Number,
    password:String,
    dates:Array<String>
}

export const generateAuthToken=async function(object:any){
    try{
        const token=jwt.sign({_id:object._id.toString()},'hellowelcometobackendwithnodejwt')
        object.tokens.push(token)
        await object.save()
        return token
    }catch(error){
        console.log(error)
    }
}


export const createDocument=async({name,type,userId,password,dates}:IDetails)=>{
    try{
        const newDetails = new Details({
            name:name,
            type:type,
            userId:userId,
            password:password,
            dates:[],
            tokens:[]
        })

        const token = await generateAuthToken(newDetails);

        const result = await newDetails.save();
        console.log(result)        
    }
    catch(err){console.log(err)}
}
