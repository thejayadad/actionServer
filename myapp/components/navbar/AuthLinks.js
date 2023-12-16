import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


const AuthLinks = async () => {
  const session = await getServerSession(options);

  return (
    <div>
         {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
    </div>
  )
}

export default AuthLinks