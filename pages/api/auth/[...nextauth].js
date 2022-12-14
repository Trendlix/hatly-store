import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from "jsonwebtoken";

import API_URL from "../../../API/ApiUrl"

axios.defaults.withCredentials = true

export const authOptions = (req,res) =>{
  return {
  // session :{
    // jwt : true,
  // },
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        async authorize(credentials) {
          try {
            const email = credentials.email;
            const password = credentials.password;
            const response = await axios.post(`${API_URL}/users/login`, {
              email,
              password,
            }
            )
            // const cookies = response.headers['set-cookie']

            // res.setHeader('Set-Cookie', cookies)
            // console.log(request)
            return response.data
          } catch (e) {
            console.log(e)
          }
        },
      }),

      // ...add more providers here
    ],
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   async encode({ token, secret }) {
    //     console.log(token)
    //       if(token){
    //         console.log(token.accessToken)
    //         return token.accessToken
    //       } 
    //       return token
    //   },
    //   async decode({token,secret}) {
    //     // return a `JWT` object, or `null` if decoding failed
    //     console.log(token)
    //       if(token){
    //         const data = jwt.verify(token , secret);    
    //         console.log(data)    
    //         return data 
    //       }
    //       return token
        
    //   },
    //   maxAge: 60 * 60 * 24 * 30,
    // },
    callbacks: {
      async jwt({ token, account, user }) {
        // if(account)
        if (user) {
            token.user = user.user
            token.accessToken = user.token
            // token.exp = token.exp
            // console.log(token)
          }
          console.log('test')
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        // if(token){
          session.user = token.user
          if (req.cookies.token)
          return session
        return {}
        // }
      }
      // async signIn({ user, account, profile, email, credentials }) {

      // console.log(user)
      // console.log(user.headers["set-cookie"][0])
      // }
    },
    cookies: {
      sessionToken: {
        name: `token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          // secure: true
        }
      }
    },
    secret: process.env.NODE_ENV,
    session: {
      maxAge: 11, //30 days,
      strategy: "jwt",
      // updateAge: 86400, // every day
    },
  }
}
export default (req, res) => {
  return NextAuth(req, res, authOptions(req, res))
}
// export default NextAuth(authOptions)