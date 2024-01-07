import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import truncateString from "./maxString";

type Props = {
  id: String;
  title: String;
  content: String;
  image: String;
  publicId: String;
  createdAt: Date;
  updatedAt: Date;
};

const NoteListItem = (props: Props) => {
  return (
    <Link href={`/view/${props.id}`}>
      <div className="flex flex-col gap-1 p-5 border border-gray-400 ">
        <h3 className="text-xl">{truncateString(String(props.title), 10)}</h3>
        <div className="relative w-full h-56">
          <Image
            src={String(props.image)}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default NoteListItem;
