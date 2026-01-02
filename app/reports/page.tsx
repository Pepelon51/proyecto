'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

interface Report {
    idreport: number;
    requestName: string;
    proyect: string;
    department: string;
    description: string;
    priority: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ReportsTableProps {
    onEdit?: (report: Report) => void;
    onDelete?: (reportId: number) => void;
}

const Reports = ({ onEdit, onDelete }: ReportsTableProps) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, control, reset } = useForm<Report>();

    // Estados para el AlertDialog de confirmación de eliminación
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/tickets');
            const data = await response.json();
            setReports(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    // Función que se llama al hacer click en el botón de eliminar
    const handleDeleteClick = (report: Report) => {
        setReportToDelete(report); // Guardamos el reporte que se va a eliminar
        setShowDeleteConfirm(true); // Mostramos el AlertDialog de confirmación
    };

    // Función que ejecuta la eliminación después de confirmar
    const confirmDelete = async () => {
        if (!reportToDelete) return;

        try {
            const response = await fetch(`/api/users/${reportToDelete.idreport}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al eliminar el ticket');
            }

            // Cerrar el diálogo de confirmación
            setShowDeleteConfirm(false);
            setReportToDelete(null);
            
            // Mostrar AlertDialog de éxito
            setSuccessMessage('Ticket eliminado exitosamente');
            setShowSuccessAlert(true);
            
            fetchUsers();
            if (onDelete) onDelete(reportToDelete.idreport);
        } catch (error) {
            console.error('Error deleting report:', error);
            alert(error instanceof Error ? error.message : 'Error al eliminar el ticket');
        }
    };


    return (
        <div>Reports</div>
    )
}

export default Reports