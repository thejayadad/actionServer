import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


const AuthLinks = async ({user}) => {
  const session = await getServerSession(options);

  return (
    <div>
         {user ? (
            <Link href="/api/auth/signout?callbackUrl=/">{user?.name} Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
    </div>
  )
}

export default AuthLinks