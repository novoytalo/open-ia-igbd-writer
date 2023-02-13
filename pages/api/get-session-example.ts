import { getServerSession } from "next-auth/next"
import type {NextApiRequest,NextApiResponse} from 'next'
import { authOptions } from "./auth/[...nextauth]"
import { getToken } from "next-auth/jwt"
export default async function notEtt (req:NextApiRequest, res:NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req })
  console.log('session api %%: ', session,'      ',token)
  if (session) {
    // Signed in
    // console.log("Session", JSON.stringify(session, null, 2))
    res.status(200).json({ name: session})
  } else {
    // Not Signed in
    res.status(401)

  }
  res.end()
}