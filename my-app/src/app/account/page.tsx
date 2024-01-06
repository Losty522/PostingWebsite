import Header from "@/components/Header";

import { getServerSession } from "next-auth";
//import { authOptions } from "../api/auth/[...nextauth]/route";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import { User } from "../user";
import SignIn from "@/components/SignIn";

const page = async () => {
  const session = await getServerSession(authOptions);

  // if (!session || !session.user?.email) {
  //   return <SignIn />;
  // }
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="text-xl mt-5 mb-5"> User Infomation</div>
        <div>UserName: {session?.user?.name}</div>
        <div>Email: {session?.user?.email}</div>

        {/* <User /> */}
      </div>
    </>
  );
};

export default page;
