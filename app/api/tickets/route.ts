import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createReportSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createReportSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const newReport = await prisma.reports.create({
        data: {requestName: body.requestName, proyect: body.proyect, department: body.department, description: body.description, priority: body.priority, solvedBy: "PENDING", status: "OPEN"}
    });

    return NextResponse.json(newReport, {status:201});

}




