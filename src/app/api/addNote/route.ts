// /src/app/api/addNote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';
import { NextResponse } from 'next/server';


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

  export async function PUT(req: Request) {
    const { id, title, content, image, publicId, email } = await req.json();
  
    if (!id || (!title && !content)) {
      return NextResponse.json({ error: 'id, title, and content are required' }, { status: 400 });
    }
    
    try {
      const updatedNote = await prisma.note.update({
        where: { id: id },
        data: {
          title,
          content,
          image,
          publicId,
          email,
        },
      });
  
      console.log("note updated");
      return NextResponse.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      return NextResponse.json({ message: 'Could not update note' }, { status: 500 });
    }
  }

