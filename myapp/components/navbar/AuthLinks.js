
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SearchForm from "../Forms/SearchForm/SearchForm";


const AuthLinks = async ({user}) => {

  return (
    <div>
         {user ? (

           <div className="flex items-center gap-4">
            <Link href={'/upload'}>UpLoad Photo</Link>
            <Link href={'/profile/${user?._id}'}>Profile</Link>
             <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </div>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
    </div>
  )
}

export default AuthLinks