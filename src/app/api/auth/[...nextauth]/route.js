import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

// Initialize MongoDB connection
const mongoClient = new MongoClient(process.env.NEXT_MongoURI_KEY);

const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          await mongoClient.connect();
          const db = mongoClient.db();
          const currentUser = await db.collection('eUsers').findOne({ email: credentials.email,password: credentials.password });

          if (!currentUser) {
            throw new Error('Incorrect Credentials.');
          }

          return {
            id: currentUser._id.toString(),
            email: currentUser.email,
            name: currentUser.name || "msi",
            role: currentUser.role || 'admin', // Adjust based on your schema
          };
        } catch (error) {
          throw new Error(error.message);
        } finally {
          await mongoClient.close();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    signOut: '/logout',
    error: '/admin/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };