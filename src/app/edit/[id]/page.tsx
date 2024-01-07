import Header from "@/components/Header";
import prisma from "@/db";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import Editform from "@/components/editForm/Editform";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const noteItem = await prisma.note.findUnique({
    where: { id: params.id },
  });

  return (
    <>
      <Header />
      <Editform noteItem={noteItem} email={String(session?.user?.email)} />
    </>
  );
};

export default page;
