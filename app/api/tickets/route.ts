import { NextRequest } from "next/server";
import { z } from 'zod';

z.object({
    
})

export async function POST(request: NextRequest) {
    const body = await request.json();
}