import GoogleProvider from '@auth/core/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import connectMongo from './lib/mongodb'
import { defineConfig } from 'auth-astro'

export default defineConfig({
    //adapter: MongoDBAdapter(connectMongo),
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
})