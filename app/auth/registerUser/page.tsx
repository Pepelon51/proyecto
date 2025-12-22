'use client'
import { createUserSchema } from '@/app/api/users/createUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertDialog, Box, Button, Container, Flex, Link, SegmentedControl, Strong, Text, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <form 
        className="w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%' }}
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
              defaultValue="Xinya LatinAmerica"
              render={({field}) => 
                <SegmentedControl.Root 
                  size='1' 
                  radius="full" 
                  value={field.value} 
                  onValueChange={field.onChange}
                  style={{width: '100%'}}
                >
                  <SegmentedControl.Item value="Xinya LatinAmerica">Xinya LatinAmerica</SegmentedControl.Item>
                  <SegmentedControl.Item value="Xinya Green Power">Xinya Green Power</SegmentedControl.Item>
                  <SegmentedControl.Item value="American Industries">American Industries</SegmentedControl.Item>
                </SegmentedControl.Root>
              }
            />
            {errors.proyect && <Text size="1" color="red">{errors.proyect.message}</Text>}

            <Flex gap="3" justify="center" style={{ marginTop: '1rem' }}>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button type="button" color="red" variant="soft">
                    Cancelar
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <AlertDialog.Title>Cancelar registro</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    ¿Estás seguro? Cancelar eliminará tu registro
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        No, no estoy seguro
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Link href="./">
                        <Button variant="solid" color="red">
                          Sí, estoy seguro
                        </Button>
                      </Link>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
              
              <Button 
                type="submit" 
                color="grass"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registrando...' : 'Registrar'}
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
                  window.location.href = './';
                }}
              >
                Aceptar
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  )
}

export default RegisterUser