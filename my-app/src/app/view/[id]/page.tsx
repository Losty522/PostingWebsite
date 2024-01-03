import prisma from "@/db";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
const page = async ({ params }: { params: { id: string } }) => {
  const noteItem = await prisma.note.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      <Header />
      <div className="flex flex-col p-2 w-full h-full">
        <h1 className="text-3xl  overflow-hidden break-words">
          {noteItem?.title}
        </h1>
        <p className="mb-3 w-3/4 overflow-hidden break-words">
          {noteItem?.content}
        </p>
      </div>
      <img src={String(noteItem?.image)} alt="" />
      <div className="flex  gap-7 mt-2">
        <Link
          href={`/edit/${params.id}`}
          className="border  border-zinc-900 text-zinc-900 px-2 py-1 text-cente bg-blue-400 hover:bg-blue-300 hover:text-black "
        >
          Edit
        </Link>

        <Link
          href={`/delete/${params.id}`}
          className="ml-auto border border-zinc-900 text-zinc-900 bg-red-400 px-2 py-1 text-center hover:bg-red-500
           hover:text-black "
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default page;
