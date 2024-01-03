import Header from "@/components/Header";
import Link from "next/link";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/DeleteButton";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import Image from "next/image";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Post = {
  id: String;
  title: String;
  content: String;
  image: String;
  publicId: String;
  createdAt: Date;
  updatedAt: Date;
};

const page = async ({ params }: { params: { id: string } }) => {
  const noteItem: Post | null = await prisma.note.findUnique({
    where: { id: params.id },
  });

  const onDelete = async (id: string, pubId: string) => {
    "use server";
    await prisma.note.delete({ where: { id } });

    //delete data
    const deletionResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.destroy(String(pubId), (error, result) => {
          if (error) {
            //console.error("Cloudinary delete error:", error);
            reject(error);
          }
          //console.log("Cloudinary delete result:", result);
          resolve(result);
        });
      }
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-col p-3 justify-center items-center">
        <div className="text-3xl text-red-800 text-center">
          Are you sure you want to permanently delete this post?
        </div>
        <div className="flex  gap-7 mt-4 mb-4">
          <Link
            href={`/`}
            className="border border-zinc-900 text-zinc-900 px-2 py-1 text-cente bg-blue-400  hover:bg-blue-500 hover:text-black "
          >
            No
          </Link>
          <DeleteButton
            id={params.id}
            publicId={String(noteItem?.publicId)}
            handleDelete={onDelete}
          />
        </div>

        <h1 className="text-lg">title: {noteItem?.title}</h1>
        <p className="mb-3">content: {noteItem?.content}</p>
        <img
          src={String(noteItem?.image)}
          alt=""
          className="w-48 h-48 object-cover"
        />
      </div>
    </>
  );
};

export default page;
