import React from "react";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import truncateString from "@/components/maxString";
import { IoIosCloseCircleOutline } from "react-icons/io";
const page = async ({ params }: { params: { id: string } }) => {
  const noteItem = await prisma.note.findUnique({
    where: { id: params.id },
  });

  return (
    <div className="flex justify-center items-center bg-black bg-opacity-60 p-5 fixed top-0 left-0 h-full w-full">
      {/* <div className="flex flex-col bg-white text-black p-3 h-1/2 w-1/2 sm:h-1/2 w-1/2"> */}
      <div className="flex flex-col bg-white text-black p-3 sm:h-3/4 w-3/4 md:h-3/4 w-1/2 lg:h-3/4 w-1/2 xl:h-3/4 w-1/2">
        <Link
          href=".."
          className="self-end  text-zinc-900 px-2 py-1 text-center hover:text-red-700 "
        >
          <IoIosCloseCircleOutline size={34} />
        </Link>

        <h1 className="   text-3xl overflow-hidden break-words">
          {noteItem?.title}
        </h1>
        <p className="max-w-full overflow-hidden break-words">
          {noteItem?.content}
        </p>
        <div className="flex justify-center items-center mt-2">
          <img src={String(noteItem?.image)} alt="" className="h-2/3 w-1/2" />
        </div>

        <div className="flex mt-2">
          <Link
            href={`/edit/${params.id}`}
            // onClick={handleEdit}
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
    </div>
  );
};

export default page;
