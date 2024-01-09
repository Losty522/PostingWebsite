import Header from "@/components/Header";
import NoteList from "@/components/NoteList";

import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import SignIn from "@/components/SignIn";

const page = async () => {
  const session = await getServerSession(authOptions);
  // if (!session || !session.user?.email) {
  //   return <SignIn />;
  // }

  return (
    <div>
      <Header />
      <NoteList />
    </div>
  );
};

export default page;
