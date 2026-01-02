import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "User", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.user || !credentials?.password) {
          return null;
        }

        try {
          console.log('Buscando usuario:', credentials.user);

          const userFound = await prisma.users.findFirst({
            where: { user: credentials.user }
          });

          if (!userFound) {
            console.log('Usuario no encontrado');
            return null;
          }

          console.log('Usuario encontrado:', userFound.user);

          const matchPassword = await bcrypt.compare(
            credentials.password,
            userFound.password
          );

          if (!matchPassword) {
            console.log('Contraseña incorrecta');
            return null;
          }

          console.log('Login exitoso');

          // TypeScript ahora reconoce 'role'
          return {
            id: userFound.iduser.toString(),
            name: userFound.name,
            email: userFound.user,
            role: userFound.role,
          };
        } catch (error) {
          console.error('Error en authorize:', error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;  // ✅ Ahora reconoce 'role'
        token.id = user.id;      // ✅ Ahora reconoce 'id'
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;  // ✅ Sin error
        session.user.id = token.id;      // ✅ Sin error
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };