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
      <div className="flex flex-col bg-white text-black p-3 w-11/12 h-full text-center">
        <Link
          href=".."
          className="self-end  text-zinc-900 px-2 py-1 text-center hover:text-red-700 "
        >
          <IoIosCloseCircleOutline size={34} />
        </Link>

        <h1 className="text-3xl break-words mb-5 ">{noteItem?.title}</h1>
        <p className="max-w-full w-full break-words text-xl">
          {noteItem?.content}
        </p>
        <img
          src={String(noteItem?.image)}
          alt=""
          className="mx-auto  w-11/12 h-3/4 max-w-fit max-h-fit object-cover"
        />

        <div className="flex w-2/4 mx-auto justify-between mt-5">
          <Link
            href={`/edit/${params.id}`}
            // onClick={handleEdit}
            className="border  border-zinc-900 text-zinc-900 px-2 py-1 text-center bg-blue-400 hover:bg-blue-300 hover:text-black "
          >
            Edit
          </Link>

          <Link
            href={`/delete/${params.id}`}
            className="border border-zinc-900 text-zinc-900 bg-red-400 px-2 py-1 text-center hover:bg-red-500
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
