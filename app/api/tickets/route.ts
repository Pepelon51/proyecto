import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { prisma } from "@/lib/prisma";

const createReportSchema = z.object({
    requestName: z.string().min(1).max(255),
    proyect: z.string().min(1).max(255),
    department: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    priority: z.string().min(1).max(100)
})

// GET - Obtener todos los tickets
export async function GET(request: NextRequest) {
    try {
        const tickets = await prisma.reports.findMany({
            orderBy: {
                createdAt: 'desc' // Los más recientes primero
            }
        });

        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        return NextResponse.json(
            { error: 'Error al obtener los tickets' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// POST - Crear un ticket
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createReportSchema.safeParse(body);
    
    if(!validation.success)
        return NextResponse.json(validation.error, {status: 400});

    const newReport = await prisma.reports.create({
        data: {
            requestName: body.requestName, 
            proyect: body.proyect, 
            department: body.department, 
            description: body.description, 
            priority: body.priority,
            solvedBy: "",
            status: "OPEN"
        }
    });

    return NextResponse.json(newReport, {status: 201});
}