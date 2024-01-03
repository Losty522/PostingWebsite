import prisma from "@/db";
import NoteListItem from "./NoteListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const NoteList = async () => {
  //const notes = await prisma?.note.findMany();

  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const notes = await prisma.note.findMany({
    where: { email: String(session.user?.email) },
  });

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
