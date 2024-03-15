interface credentials{
    id:string,
    password:string
}
import { response } from "express"
import Details from "./models/Details"

export const validation=async ({id,password}:credentials)=>{
    const userId=Number(id)
   const result= await Details.find({userId:userId})
   if (result.length!=0 && password===result[0].password){
    return result[0]
   }
   return false
}