import prisma from "@/db";
import NoteListItem from "./NoteListItem";
import { getServerSession } from "next-auth";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import authOptions from "@/app/api/auth/[...nextauth]/option";

const NoteList = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  let notes;
  try {
    notes = await prisma.note.findMany({
      where: { email: String(session.user?.email) },
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  await console.log(notes);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 p-5">
      {notes.map((note) => (
        <NoteListItem key={note.id} {...note} />
      ))}
    </div>
  );
};

export default NoteList;
