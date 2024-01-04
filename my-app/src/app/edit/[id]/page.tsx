import Header from "@/components/Header";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const noteItem = await prisma.note.findUnique({
    where: { id: params.id },
  });

  const updateTodo = async (formData: FormData) => {
    "use server";

    const titleInput = formData.get("title")?.valueOf();
    const contentInput = formData.get("content")?.valueOf();

    const imagetInput = formData.get("image") as File;
    const arrayBuffer = await imagetInput.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const noteItem = await prisma.note.findUnique({
      where: { id: params.id },
    });

    if (
      typeof titleInput !== "string" ||
      titleInput.length === 0 ||
      titleInput.length > 20
    ) {
      return;
      //throw new Error();
    }
    if (
      typeof contentInput !== "string" ||
      contentInput.length === 0 ||
      contentInput.length > 200
    ) {
      return;
      //throw new Error();
    }

    //if the picture is chosen, then uplode new data and delete old data
    if (imagetInput.name != "undefined") {
      //upload new pic data
      const cloudinaryResult: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, function (error, result) {
              if (error) {
                reject(error);
              }
              resolve(result);
            })
            .end(buffer);
        }
      );

      //delete data
      const deletionResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader.destroy(
            String(noteItem?.publicId),
            (error, result) => {
              if (error) {
                //console.error("Cloudinary delete error:", error);
                reject(error);
              }
              //console.log("Cloudinary delete result:", result);
              resolve(result);
            }
          );
        }
      );
      await prisma.note.update({
        where: { id: params.id },
        data: {
          title: titleInput,
          content: contentInput,
          image:
            buffer.length > 0 ? cloudinaryResult?.secure_url : noteItem?.image,
          publicId: cloudinaryResult?.public_id,
          email: String(session?.user?.email),
        },
      });
    } else {
      //change the only title or content, imgae and publick id is sitll previous one.
      await prisma.note.update({
        where: { id: params.id },
        data: {
          title: titleInput,
          content: contentInput,
          image: noteItem?.image,
          publicId: noteItem?.publicId,
          email: String(session?.user?.email),
        },
      });
    }

    redirect("/");
  };

  return (
    <>
      <Header />
      <div className=" text-black">
        <form action={updateTodo} className="flex flex-col gap-2 p-10">
          <div className="text-center mt-3 text-xl">Edit post</div>
          <label>Title (Max:20 words)</label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-1"
            defaultValue={noteItem?.title}
            maxLength={20}
          />
          <label>Comment (Max:200 words)</label>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={5}
            defaultValue={noteItem?.content}
            maxLength={200}
          />
          <label htmlFor="">Image</label>
          <input type="file" name="image" accept=".jpg, .jpeg,.webp" />
          <div className="flex mt-2">
            <button
              type="submit"
              className="border  border-zinc-900 text-zinc-900 px-2 py-1 text-cente bg-blue-400 hover:bg-blue-300 hover:text-black "
            >
              Update
            </button>
            <Link
              href="/"
              className="ml-auto border border-zinc-900 text-zinc-900 bg-red-400 px-2 py-1 text-center hover:bg-red-500
           hover:text-black "
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
