import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { prisma } from "@/lib/prisma";

const createUserSchema = z.object({
    user: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
    position: z.string().min(1).max(255),
    name: z.string().min(1).max(100),
    proyect: z.string().min(1).max(60),
    role: z.string().min(1).max(60)
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error, {status: 400});

    const newUser = await prisma.users.create({
        data: {user: body.user, password: body.password, position: body.position, name: body.name, proyect: body.proyect, role: body.role}
    });

    return NextResponse.json(newUser, {status:201});

}




