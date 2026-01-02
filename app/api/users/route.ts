import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "../../createUserSchema";
import bcrypt from 'bcryptjs';

// GET: Obtener todos los usuarios
export async function GET(request: NextRequest) {
    try {
        const users = await prisma.users.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                iduser: true,
                user: true,
                name: true,
                position: true,
                proyect: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        return NextResponse.json(users, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Error al obtener usuarios" },
            { status: 500 }
        );
    }
}

// POST: Crear nuevo usuario
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validación con zod
        const validation = createUserSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                validation.error.format(), 
                { status: 400 }
            );
        }

        // Verificar si el usuario ya existe
        const userFound = await prisma.users.findFirst({
            where: { user: body.user }
        });

        if (userFound) {
            return NextResponse.json(
                { message: 'El usuario ya existe' }, 
                { status: 400 }
            );
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Crear usuario
        const newUser = await prisma.users.create({
            data: {
                user: body.user, 
                password: hashedPassword, 
                position: body.position || '', 
                name: body.name, 
                proyect: body.proyect || '', 
                role: body.role || 'USER'
            },
            select: {
                iduser: true,
                user: true,
                name: true,
                position: true,
                proyect: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return NextResponse.json(newUser, { status: 201 });
        
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Error al crear usuario" },
            { status: 500 }
        );
    }
}