'use server'

import prisma from "@/db";
import bcrypt from 'bcrypt';

export const signUp = async(email:string,password:string,userName:string)=>{
  const user = await prisma.user.findUnique(
    {
      where:{email,}
    })

    if(user){
      return "User with that email already exists"
    }

    const passwordHash = bcrypt.hashSync(password,10);

    await prisma.user.create(
      {
        data:{
          email:email,
          password:passwordHash,
          name:userName
        }
      })

      return "Successfully created new user with that email"
}