'use client';

import { Box, Flex, Heading, ScrollArea, Table, Button, Dialog, TextField, Text, SegmentedControl, AlertDialog } from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import warningImage from '../images/warning.png';
import Image from 'next/image';
import successMark from '../images/mark.png';

interface User {
    iduser: number;
    user: string;
    name: string;
    position: string;
    proyect: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface EditUserForm {
    user: string;
    name: string;
    position: string;
    proyect: string;
    role: string;
}

interface UsersTableProps {
    onEdit?: (user: User) => void;
    onDelete?: (userId: number) => void;
}

const UsersTable = ({ onEdit, onDelete }: UsersTableProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    // Estados para el AlertDialog de confirmación de eliminación
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const { register, handleSubmit, control, reset } = useForm<EditUserForm>();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Función que se llama al hacer click en el botón de eliminar
    const handleDeleteClick = (user: User) => {
        setUserToDelete(user); // Guardamos el usuario que se va a eliminar
        setShowDeleteConfirm(true); // Mostramos el AlertDialog de confirmación
    };

    // Función que ejecuta la eliminación después de confirmar
    const confirmDelete = async () => {
        if (!userToDelete) return;

        try {
            const response = await fetch(`/api/users/${userToDelete.iduser}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al eliminar usuario');
            }

            // Cerrar el diálogo de confirmación
            setShowDeleteConfirm(false);
            setUserToDelete(null);
            
            // Mostrar AlertDialog de éxito
            setSuccessMessage('Usuario eliminado exitosamente');
            setShowSuccessAlert(true);
            
            fetchUsers();
            if (onDelete) onDelete(userToDelete.iduser);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(error instanceof Error ? error.message : 'Error al eliminar el usuario');
        }
    };

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        reset({
            user: user.user,
            name: user.name,
            position: user.position,
            proyect: user.proyect,
            role: user.role,
        });
        setIsDialogOpen(true);
    };

    const handleEditSubmit = async (data: EditUserForm) => {
        if (!editingUser) return;

        try {
            const response = await fetch(`/api/users/${editingUser.iduser}`, {
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
            setEditingUser(null);
            
            setSuccessMessage('Usuario actualizado exitosamente');
            setShowSuccessAlert(true);
            
            fetchUsers();
            if (onEdit) onEdit(result);
        } catch (error) {
            console.error('Error updating user:', error);
            alert(error instanceof Error ? error.message : 'Error al actualizar el usuario');
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
                <p>Cargando usuarios...</p>
            </Box>
        );
    }

    return (
        <>
            <ScrollArea type="always" scrollbars="vertical" style={{ maxHeight: 500 }}>
                <Box p="2" pr="8">
                    <Heading size="4" mb="4" trim="start" style={{ display: 'flex', alignItems: 'center' }}>
                        Usuarios Registrados ({users.length})
                    </Heading>
                    <Flex direction="column" gap="4">
                        <Box>
                            <Table.Root variant="surface">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Usuario</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Proyecto</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Posición</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Rol</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Creado</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Modificado</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {users.map((user) => (
                                        <Table.Row key={user.iduser}>
                                            <Table.RowHeaderCell>
                                                {user.name || 'No especificado'}
                                            </Table.RowHeaderCell>
                                            <Table.Cell>{user.user}</Table.Cell>
                                            <Table.Cell>{user.proyect || 'No asignado'}</Table.Cell>
                                            <Table.Cell>{user.position || 'No especificado'}</Table.Cell>
                                            <Table.Cell>{user.role || 'No asignado'}</Table.Cell>
                                            <Table.Cell>
                                                <div style={{ fontSize: '12px' }}>
                                                    <div>{formatDate(user.createdAt)}</div>
                                                    <div style={{ color: '#666' }}>{formatTime(user.createdAt)}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div style={{ fontSize: '12px' }}>
                                                    <div>{formatDate(user.updatedAt)}</div>
                                                    <div style={{ color: '#666' }}>{formatTime(user.updatedAt)}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Flex gap="2">
                                                    <Button
                                                        size="1"
                                                        variant="soft"
                                                        color="blue"
                                                        onClick={() => handleEditClick(user)}
                                                    >
                                                        <Pencil2Icon width="14" height="14" />
                                                    </Button>
                                                    {/* Cambié onClick para que llame a handleDeleteClick */}
                                                    <Button
                                                        size="1"
                                                        variant="soft"
                                                        color="red"
                                                        onClick={() => handleDeleteClick(user)}
                                                    >
                                                        <TrashIcon width="14" height="14" />
                                                    </Button>
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>

                            {users.length === 0 && (
                                <Box style={{ textAlign: 'center', padding: '40px' }}>
                                    <p>No hay usuarios registrados</p>
                                </Box>
                            )}
                        </Box>
                    </Flex>
                </Box>
            </ScrollArea>

            {/* Modal de Edición */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content maxWidth="45%">
                    <Dialog.Title>Editar usuario</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Actualiza los datos del usuario
                    </Dialog.Description>

                    <form onSubmit={handleSubmit(handleEditSubmit)}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Nombre
                                </Text>
                                <TextField.Root
                                    {...register('name', { required: true })}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Usuario
                                </Text>
                                <TextField.Root
                                    {...register('user', { required: true })}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Posición
                                </Text>
                                <TextField.Root
                                    {...register('position', { required: true })}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Proyecto
                                </Text>
                                <Controller
                                    name="proyect"
                                    control={control}
                                    render={({ field }) => (
                                        <SegmentedControl.Root
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SegmentedControl.Item value="Xinya LatinAmerica">Xinya LatinAmerica</SegmentedControl.Item>
                                            <SegmentedControl.Item value="Xinya Green Power">Xinya Green Power</SegmentedControl.Item>
                                            <SegmentedControl.Item value="American Industries">American Industries</SegmentedControl.Item>
                                        </SegmentedControl.Root>
                                    )}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Rol
                                </Text>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <SegmentedControl.Root
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SegmentedControl.Item value="Admin">Admin</SegmentedControl.Item>
                                            <SegmentedControl.Item value="Helper">Helper</SegmentedControl.Item>
                                        </SegmentedControl.Root>
                                    )}
                                />
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Button 
                                type="button"
                                style={{ backgroundColor: 'red', color: 'white' }}
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

            {/* AlertDialog de Confirmación de Eliminación */}
            <AlertDialog.Root open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title style={{display:'flex', alignContent:'normal', alignItems:'center'}}>
                        <Image src={warningImage} alt="Warning" width={28} height={28} style={{marginRight:'8px'}}/>Confirmar eliminación
                        
                    </AlertDialog.Title>
                    <AlertDialog.Description size="3">
                        ¿Estás seguro de eliminar al usuario <strong>{userToDelete?.name}</strong>?
                        <br />
                        Esta acción no se puede deshacer.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button 
                                variant="soft" 
                                color="gray"
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setUserToDelete(null);
                                }}
                            >
                                Cancelar
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button 
                                variant="solid" 
                                color="red"
                                onClick={confirmDelete}
                            >
                                Sí, eliminar
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            {/* AlertDialog de Éxito */}
            <AlertDialog.Root open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title style={{display:'flex'}}>
                        <Image src={successMark} alt="Success" width={28} height={28} style={{marginRight:'8px'}}/>
                         Operación exitosa
                    </AlertDialog.Title>
                    <AlertDialog.Description size="3">
                        {successMessage}
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Action>
                            <Button 
                                variant="solid" 
                                color="green"
                                onClick={() => setShowSuccessAlert(false)}
                            >
                                Aceptar
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default UsersTable;