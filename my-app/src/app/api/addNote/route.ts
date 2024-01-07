// /src/app/api/addNote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';
import { NextResponse } from 'next/server';

export function GET(){
    return NextResponse.json({massage:'test message'})
}

export async function POST(req:Request){
  const { title, content, image, publicId, email } = await req.json();

  if(!title && !content){
    return NextResponse.json({error:'title and content are reqired'},{status: 500})
  }
    try {
        const createdNote = await prisma.note.create({
        data: {
          title,
          content,
          image,
          publicId,
          email,
        },
      });
      console.log("post created")
      return NextResponse.json(createdNote);
    } catch (error) {
      return NextResponse.json({message:'could not create'})
    }
  }

