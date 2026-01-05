'use client'
import { Badge, Box, Button, Container, Dialog, Flex, SegmentedControl, Select, Strong, Table, Text, TextArea, TextField } from '@radix-ui/themes';
import { formatDate } from 'date-fns';
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { report } from 'process';

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
    const [editingReport, setEditingReport] = useState<Report | null>(null);


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
            const response = await fetch(`/api/tickets/${reportToDelete.idreport}`, {
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
    const formatDate = (date: Date) => {
        return format(new Date(date), 'dd/MM/yyyy', { locale: es });
    };

    const formatTime = (date: Date) => {
        return format(new Date(date), 'HH:mm', { locale: es });
    };


    if (loading) {
        return (
            <Box style={{ textAlign: 'center', padding: '40px' }}>
                <p>Cargando reportes...</p>
            </Box>
        );
    }



    const getRadixStatusColor = (status: string) => {
        const statusUpper = status.toUpperCase();

        switch (statusUpper) {
            case 'OPEN':
                return 'red';
            case 'IN_PROGRESS':
                return 'amber';
            case 'CLOSED':
                return 'grass';
            default:
                return 'gray';
        }
    };
    const getRadixPriorityColor = (priority: string) => {
        const priorityUpper = priority.toUpperCase();

        switch (priorityUpper) {
            case 'ALTA':
                return 'red';
            case 'MEDIA':
                return 'amber';
            case 'BAJA':
                return 'grass';
            default:
                return 'gray';
        }
    };
    //Función en el botón editar
    const handleEditClick = (report: Report) => {
        setEditingReport(report);
        reset({
            idreport: report.idreport,
            requestName: report.requestName,
            description: report.description,
            proyect: report.proyect,
            department: report.department,
            priority: report.priority,
            status: report.status,
        });
        setIsDialogOpen(true);
    };

    const handleEditSubmit = async (data: Report) => {
        if (!editingReport) return;

        try {
            const response = await fetch(`/api/reports/${editingReport.idreport}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al actualizar usuario');
            }

            setIsDialogOpen(false);
            setEditingReport(null);

            setSuccessMessage('Reporte actualizado exitosamente');
            setShowSuccessAlert(true);

            fetchUsers();
            if (onEdit) onEdit(result);
        } catch (error) {
            console.error('Error updating user:', error);
            alert(error instanceof Error ? error.message : 'Error al actualizar el usuario');
        }
    };


    return (
        <>
            <div className="flex justify-center items-center">
                <div className="max-h-lh">
                    <Box className="shadow-2xl bg-white rounded-lg" style={{ marginBottom: '20vh' }}>
                        <div className="p-5 text-center">
                            <h3><strong>Reportes</strong></h3>
                        </div>
                        <Box style={{ marginInline: '20vh', marginBottom: '20vh' }}>
                            <Table.Root variant="surface">
                                <Table.Header style={{ textAlign: 'center' }}>
                                    <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Reporta</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Fecha de Creación</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Fecha de Actualización</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Prioridad</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>

                                </Table.Header>
                                <Table.Body style={{ textAlign: 'center' }}>
                                    {reports.map((report) => (
                                        <Table.Row key={report.idreport}>
                                            <Table.RowHeaderCell>
                                                <Text weight="bold">#{report.idreport}</Text>
                                            </Table.RowHeaderCell>
                                            <Table.Cell>{report.requestName || 'No asignado'}</Table.Cell>

                                            <Table.Cell>
                                                <div style={{ fontSize: '12px' }}>
                                                    <div>{formatDate(report.createdAt)}</div>
                                                    <div style={{ color: '#666' }}>{formatTime(report.createdAt)}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div style={{ fontSize: '12px' }}>
                                                    <div>{formatDate(report.updatedAt)}</div>
                                                    <div style={{ color: '#666' }}>{formatTime(report.updatedAt)}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge color={getRadixPriorityColor(report.priority)} variant="soft">
                                                    {report.priority}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge color={getRadixStatusColor(report.status)} variant="soft">
                                                    {report.status}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell >
                                                <Flex gap="2">
                                                    <Button
                                                        size="1"
                                                        variant="soft"
                                                        color="blue"
                                                        onClick={() => handleEditClick(report)}
                                                    >
                                                        <Pencil2Icon width="14" height="14" />
                                                    </Button>
                                                    {/* Cambié onClick para que llame a handleDeleteClick */}
                                                    <Button
                                                        size="1"
                                                        variant="soft"
                                                        color="red"
                                                        onClick={() => handleDeleteClick(report)}
                                                    >
                                                        <TrashIcon width="14" height="14" />
                                                    </Button>
                                                </Flex>
                                            </Table.Cell>

                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    </Box>
                </div>
            </div>

            {/* Modal de Edición */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content maxWidth="45%">
                    <Dialog.Title>Editar reporte</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Actualiza los datos del reporte
                    </Dialog.Description>

                    <form onSubmit={handleSubmit(handleEditSubmit)}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    ID
                                </Text>
                                <TextField.Root disabled
                                    {...register('idreport', { required: true })}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Reporta
                                </Text>
                                <TextField.Root disabled
                                    {...register('requestName', { required: true })}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Departamento
                                </Text>
                                <TextField.Root disabled
                                    {...register('department', { required: true })}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Proyecto
                                </Text>
                                <TextField.Root disabled
                                    {...register('proyect', { required: true })}
                                />

                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Estado
                                </Text>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select.Root
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <Select.Trigger color='gray' />
                                            <Select.Content>
                                                <Select.Item style={{ color: 'red' }} value="OPEN">OPEN</Select.Item>
                                                <Select.Item style={{ color: 'orange' }} value="IN_PROGRESS">IN_PROGRESS</Select.Item>
                                                <Select.Item style={{ color: 'green' }} value="CLOSED">CLOSED</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    )}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Prioridad
                                </Text>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Select.Root
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <Select.Trigger color='gray' />
                                            <Select.Content>
                                                <Select.Item style={{ color: 'red' }} value="Alta">Alta</Select.Item>
                                                <Select.Item style={{ color: 'orange' }} value="Media">Media</Select.Item>
                                                <Select.Item style={{ color: 'green' }} value="Baja">Baja</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    )}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Descripción
                                </Text>
                                <TextArea disabled
                                    {...register('description', { required: true })}
                                />

                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Button
                                type="button"
                                style={{ backgroundColor: 'tomato', color: 'white' }}
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'seagreen' }}
                            >
                                Guardar
                            </Button>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

export default Reports