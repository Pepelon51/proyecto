import { z } from "zod";

export const createReportSchema = z.object({
    requestName: z.string().min(1, 'Nombre es obligatorio').max(255),
    proyect: z.string().min(1, 'Proyecto es obligatorio').max(255),
    department: z.string().min(1, 'Departamento es obligatorio').max(255),
    description: z.string().min(1, 'Descripción es obligatorio').max(255),
    priority: z.string().min(1, 'Por favor selecciona la prioridad de tu solicitud').max(100)
});
