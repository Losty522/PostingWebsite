"use client";

import Link from "next/link";

type Props = {
  id: string;
  publicId: string | null;
  handleDelete: (id: string, pucId: string) => void;
};

const DeleteButton = (props: Props) => {
  const onDelete = () => {};

  return (
    <Link href="/">
      <button
        onClick={() => props.handleDelete(props.id, String(props.publicId))}
        className="border border-zinc-900 text-zinc-900 px-2 py-1 text-center bg-red-400  hover:bg-red-500
       hover:text-black "
      >
        Yes
      </button>
    </Link>
  );
};

export default DeleteButton;
