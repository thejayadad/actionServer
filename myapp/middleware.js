export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        "/upload/:path*",
        "/profile/:path*/private",
        "/profile/:path*/favorite",
        "/search/private/:path*"
    ]
}