import Header from "@/components/Header";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import SignIn from "@/components/SignIn";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import AddForm from "@/components/addForm/AddForm";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return <SignIn />;
  }

  return (
    <>
      <Header />
      <AddForm email={session.user?.email} />
    </>
  );
};

export default page;
