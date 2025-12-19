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

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createReportSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error, {status: 400});

    const newReport = await prisma.reports.create({
        data: {requestName: body.requestName, proyect: body.proyect, department: body.department, description: body.description, priority: body.priority, solvedBy: "PENDING", status: "OPEN"}
    });

    return NextResponse.json(newReport, {status:201});

}




