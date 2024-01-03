import { RiHome2Line, RiUserLine, RiAddLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import truncateString from "./maxString";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-between border-b border-zinc-500 p-5 text-xs bg-slate-500">
      <menu className="flex gap-5">
        <li>
          <Link href="/">
            <div className="flex flex-col items-center">
              <RiHome2Line size={36} />
              <div className="sm:text-base md:text-lg">Home</div>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/account">
            <div className="flex flex-col items-center">
              <RiUserLine size={36} />
              <div className="sm:text-base md:text-lg">Account</div>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/add">
            <div className="flex flex-col items-center">
              <RiAddLine size={36} />
              <div className="sm:text-base md:text-lg">Post</div>
            </div>
          </Link>
        </li>
      </menu>
      <div className="flex items-center">
        <div className="sm:text-sm md:text-2xl pr-2 overflow-hidden">
          User: {truncateString(String(session?.user?.name), 10)}
        </div>
        <Link href="/auth/signout">
          <div className="flex flex-col items-center">
            <CiLogout size={36} />
            <div className="sm:text-base md:text-lg">Sign Out</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
