import GoogleProvider from '@auth/core/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/mongoPromise'
import { defineConfig } from 'auth-astro'

export default defineConfig({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
          clientId: import.meta.env.GOOGLE_CLIENT_ID,
          clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
          
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"

            }
          }
        })
      ],
      callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            user && (token.user = user)
            return token
        },
        async session({session, token, user}) {
            session = {
                ...session,
                user: {
                    ...user,
                    
                    ...session.user
                }
            }
            return session
        }
    }
})