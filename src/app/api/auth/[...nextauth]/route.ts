// import { compare } from 'bcrypt'
// import NextAuth, { type NextAuthOptions } from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import prisma from '@/db'

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: 'jwt'
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Sign in',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'hello@example.com'
//         },
//         password: { label: 'Password', type: 'password' },
        
//       },
//         async authorize(credentials) {
//           if (!credentials?.email || !credentials.password) {
//             console.log("errordsada");
//             return null
//           }
  
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials?.email
//             }
//           })
  
//           if (!user) {
//             console.log("errordsada");
//             return null
//           }
  
//           const isPasswordValid = await compare(
//             credentials?.password,
//             user.password
//           )
  
//           if (!isPasswordValid) {
            
//             return null
//           }
          
//           // const user = {
//           //   id: 1,
//           //   email: "q@q",
//           //   name: "q@q",
//           //   randomKey: 'Hey cool'
//           // }
//           return {
//             id: user.id + '',
//             email: user.email,
//             name: user.name,
//             randomKey: 'Hey cool'
//           }

//         }
//       }
//     )
//   ],
//   pages: {
//     signIn: "/auth/signin",
//     signOut: '/auth/signout'
//   },
//   callbacks: {
//     session:({session,token})=>{
//       //console.log('session callback',{session,token})
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           randomKey: token.randomKey
//         }
//       }
//     },
//     jwt:({token,user})=>{
//      //console.log('jwt callback',{token,user})
//       if (user) {
//         const u = user as unknown as any
//         return {
//           ...token,
//           id: String(u.id),
//           randomKey: u.randomKey
//         }
//       }
//       return token
//     }
//   }
// }

import  authOptions  from './option';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }