import { z } from "zod";

export const createUserSchema = z.object({
    user: z.string().min(1, 'Campo obligatorio').max(255),
    password: z.string().min(1, 'Campo obligatorio').max(255),
    position: z.string().min(1, 'Campo obligatorio').max(255),
    name: z.string().min(1, 'Campo obligatorio').max(100),
    proyect: z.string().min(1, 'Campo obligatorio').max(60),
    role: z.string().min(1, 'Campo obligatorio').max(60)
});
