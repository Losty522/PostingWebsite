// import { getServerSession } from 'next-auth/next'
// import { NextResponse } from 'next/server'
// import { authOptions } from './auth/[...nextauth]/route'

// export async function GET(rquest:Request) {
//   const session = await getServerSession(authOptions)
//   return NextResponse.json({authenticated:!!session})
// }

import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
//import { authOptions } from "./auth/[...nextauth]/route";
import authOptions  from "./auth/[...nextauth]/option";

export async function GET(request: Request) {
const session = await getServerSession(authOptions);

if (!session) {
return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
status: 401,
});
}

return NextResponse.json({ authenticated: !!session });
}