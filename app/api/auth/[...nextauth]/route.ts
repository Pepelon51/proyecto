import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
CredentialsProvider({
    name: "Credentials",
    credentials: {
        user: { label: "User", type: "text", placeholder: "User" },
        password: { label: "Password", type: "password", placeholder: "Password" }
    },
    async authorize(credentials, req) {
        // Verificar que credentials exista
        if (!credentials) throw new Error('No se proporcionaron credenciales');
        
        console.log(credentials);
        
        const userFound = await prisma.users.findFirst({
            where: { user: credentials.user }
        });
        
        if (!userFound) throw new Error('No se encontró el usuario');
        
        console.log(userFound);

        const matchPassword = await bcrypt.compare(
            credentials.password, 
            userFound.password
        );
        
        if (!matchPassword) throw new Error('Contraseña incorrecta');
        
        // Retornar el usuario si la contraseña coincide
        return {
            id: userFound.iduser.toString(),
            name: userFound.name,
            user: userFound.user,
        };
    }
})
]}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };