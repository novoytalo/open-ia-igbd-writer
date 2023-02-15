import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/about-2', request.url))
// }

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }

export { default } from "next-auth/middleware"


export const config = { matcher: ["/api/protected/:function*"] }



// ...


// import withAuth from "next-auth/middleware"
// import { authOptions } from "pages/api/auth/[...nextauth]";

// export default withAuth({
//   jwt: { decode: authOptions.jwt },
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   },
// })