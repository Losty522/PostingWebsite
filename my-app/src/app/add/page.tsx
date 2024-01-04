import Header from "@/components/Header";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { getServerSession } from "next-auth";

import SignIn from "@/components/SignIn";
//import { authOptions } from "../api/auth/[...nextauth]/route";
import authOptions from "@/app/api/auth/[...nextauth]/option";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return <SignIn />;
  }

  //once submit button , the function will be called
  const addNote = async (formData: FormData) => {
    "use server";

    const titleInput = formData.get("title")?.valueOf();
    const contentInput = formData.get("content")?.valueOf();

    const imagetInput = formData.get("image") as File;
    const arrayBuffer = await imagetInput.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

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

    if (imagetInput?.name == "undefined") {
      return;
    }

    //upload data
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

    // Check if Cloudinary result has a secure_url
    if (!cloudinaryResult?.secure_url) {
      console.log("Cloudinary upload failed");
      return;
    }
    await console.log(cloudinaryResult);
    await prisma?.note.create({
      data: {
        title: titleInput,
        content: contentInput,
        image: cloudinaryResult?.secure_url,

        publicId: cloudinaryResult?.public_id,
        email: String(session.user?.email),
      },
    });

    redirect("/");
  };

  return (
    <>
      <Header />
      <div>
        <form action={addNote} className="flex flex-col text-black gap-2 p-10">
          <div className="text-center mt-3 text-xl">Create a new post </div>
          <label>Title (Max:20 words)</label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-1"
            maxLength={20}
          />
          <label>Comment (Max:200 words)</label>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={5}
            maxLength={200}
          />
          <label>Image</label>
          <input type="file" name="image" accept=".jpg, .jpeg,.webp" />
          <div className="flex mt-2">
            <button
              type="submit"
              className="border  border-zinc-900 text-zinc-900 px-2 py-1 text-cente bg-blue-400 hover:bg-blue-300 hover:text-black "
            >
              Add
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
