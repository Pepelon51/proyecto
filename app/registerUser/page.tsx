'use client'
import SpinnerComponent from '@/app/components/Spinner';
import { createUserSchema } from '@/app/createUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertDialog, Box, Button, Flex, Link, SegmentedControl, Strong, Text, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Sidebar from '../components/Sidebar';
import UsersTable from '../components/UsersTable';


interface registerForm{
  user: string;
  password: string;
  position: string;
  name: string;
  proyect: string;
  role: string;
}

const RegisterUser = () => {
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {register, handleSubmit, control, formState: {errors} } = useForm<registerForm>({
    resolver: zodResolver(createUserSchema)
  });
  
  const onSubmit = async (data: registerForm) => {
    try {
      setIsSubmitting(true);
      setError('');
      const response = await axios.post('/api/users', data);
      setShowSuccess(true);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error al crear el usuario:', error);
      setError('Ocurrió un error inesperado');
    }
  };
      
  return (
    
    <div style={{ minHeight: '70vh', display: '-ms-grid', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      <form 
        className="w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto'
         }}
      >
        <Box 
          className="shadow-2xl" 
          style={{ 
            borderRadius: "var(--radius-5)", 
            padding: '2rem',
            backgroundColor: 'white'
          }}
        >
          <Text size="5" style={{ marginBottom: '1.5rem', display: 'block', textAlign: 'center' }}>
            <Strong>Registro de usuario</Strong>
          </Text>
          
          {error && (
            <Box style={{ 
              padding: '10px', 
              backgroundColor: '#fee', 
              borderRadius: '5px', 
              marginBottom: '1rem',
              color: 'red'
            }}>
              {error}
            </Box>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField.Root 
              placeholder='Nombre de usuario'
              {...register('user')}
            />
            {errors.user && <Text size="1" color="red">{errors.user.message}</Text>}
            
            <TextField.Root 
              placeholder='Nombre completo'
              {...register('name')}
            />
            {errors.name && <Text size="1" color="red">{errors.name.message}</Text>}
            
            <TextField.Root 
              type='password' 
              placeholder='Crea una contraseña'
              {...register('password')}
            />
            {errors.password && <Text size="1" color="red">{errors.password.message}</Text>}
            
            <TextField.Root 
              placeholder='Posición: ej. Practicante, técnico, etc.'
              {...register('position')}
            />
            {errors.position && <Text size="1" color="red">{errors.position.message}</Text>}

            <Controller 
              name="proyect" 
              control={control} 
              defaultValue="Xinya Latin America"
              render={({field}) => 
                <SegmentedControl.Root 
                  size='1' 
                  radius="full" 
                  value={field.value} 
                  onValueChange={field.onChange}
                  style={{width: '100%'}}
                >
                  <SegmentedControl.Item value="Xinya Latin America">Xinya Latin America</SegmentedControl.Item>
                  <SegmentedControl.Item value="Xinya Green Power">Xinya Green Power</SegmentedControl.Item>
                  <SegmentedControl.Item value="American Industries">American Industries</SegmentedControl.Item>
                </SegmentedControl.Root>
              }
            />
            <Controller 
              name="role" 
              control={control} 
              defaultValue="Helper"
              render={({field}) => 
                <SegmentedControl.Root 
                  size='1' 
                  radius="full" 
                  value={field.value} 
                  onValueChange={field.onChange}
                  style={{width: '100%'}}
                >
                  <SegmentedControl.Item value="Admin">Admin</SegmentedControl.Item>
                  <SegmentedControl.Item value="Helper">Helper</SegmentedControl.Item>
                </SegmentedControl.Root>
              }
            />
            <Flex gap="3" justify="center" style={{ marginTop: '1rem' }}>
              <Button 
                type="submit" 
                color="grass"
                disabled={isSubmitting}
              >
                Registrar {isSubmitting&&<SpinnerComponent/>}
              </Button>
            </Flex>
          </div>
        </Box>
      </form>

      

      {/* AlertDialog de éxito */}
      <AlertDialog.Root open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>¡Usuario creado exitosamente!</AlertDialog.Title>
          <AlertDialog.Description size="3">
            El usuario ha sido registrado correctamente.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button 
                variant="solid" 
                color="green"
                onClick={() => {
                  setShowSuccess(false);
                  window.location.href = '/dashboard';
                }}>
                Aceptar
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Box style={{marginTop:'7vh'}}>
      <UsersTable/>
      </Box>
    </div>
  )
}

export default RegisterUser