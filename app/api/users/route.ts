import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "../../createUserSchema";
import bcrypt from 'bcryptjs';



export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);

    const userFound = await prisma.users.findFirst({
        where: {user: body.user}
    });

    if (userFound) {
        return NextResponse.json({message: 'El usuario ya existe'}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    if(!validation.success)
        return NextResponse.json(validation.error, {status: 400});

    const newUser = await prisma.users.create({
        data: {user: body.user, password: hashedPassword, position: body.position, name: body.name, proyect: body.proyect, role: body.role}
    });

    return NextResponse.json(newUser, {status:201});

}




