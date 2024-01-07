"use client";
import Link from "next/link";
import crypto from "crypto";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
};

const AddForm = (props: Props) => {
  //const session = getServerSession(authOptions);

  const formData = new FormData();
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiName = process.env.NEXT_PUBLIC_CLOUDINARY_API_CLOUD_NAME;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  const uploadPreset = "ml_default";
  const router = useRouter();

  const generateSignature = (timestamp: number) => {
    const signatureString = `timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    return { signature, timestamp };
  };

  const addNote = async (
    e: React.FormEvent<HTMLFormElement>,
    timestampG: number
  ) => {
    e.preventDefault();
    const { signature, timestamp } = generateSignature(timestampG);
    const fileInput = e.currentTarget.elements.namedItem("image");
    const titleInput = e.currentTarget.elements.namedItem("title");
    const contentInput = e.currentTarget.elements.namedItem("content");

    if (
      fileInput instanceof HTMLInputElement &&
      titleInput instanceof HTMLInputElement &&
      contentInput instanceof HTMLTextAreaElement
    ) {
      const file = fileInput.files?.[0];
      if (!file) {
        console.log("No file selected");
        return;
      }
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", String(apiName));
      formData.append("api_key", String(apiKey));
      formData.append("signature", String(signature));
      formData.append("timestamp", String(timestamp));
      const title = titleInput.value;
      const content = contentInput.value;

      if (!title || title.length === 0 || title.length > 20) {
        console.log("erro title");
        return;
      }

      if (!content || content.length === 0 || content.length > 200) {
        console.log("erro content");
        return;
      }

      //upload
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${apiName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Cloudinary upload failed:", errorData);
          throw new Error("Cloudinary upload failed");
        }

        const result = await response.json();

        //upload data prisma api
        const dbResponse = await fetch("api/addNote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
            image: result.url,
            publicId: result.public_id,
            email: props.email,
          }),
        });

        if (!dbResponse.ok) {
          const dbErrorData = await dbResponse.json();
          console.error("Error saving to database:", dbErrorData);
          throw new Error("Error saving to database");
        }

        console.log("Data saved to database successfully");
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          addNote(e, timestamp);
        }}
        className="flex flex-col text-black gap-2 p-10"
      >
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
  );
};

export default AddForm;
