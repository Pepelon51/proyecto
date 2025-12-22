import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "./createUserSchema";

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




