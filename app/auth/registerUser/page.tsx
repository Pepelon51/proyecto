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

const registerUser =() => {


    const [error, setError] = useState('')
    const [showSuccess, setShowSuccess] = useState(false);
    const {register, handleSubmit, control, formState: {errors} } = useForm<registerForm>({
        resolver: zodResolver(createUserSchema)}
    );
    const onSubmit = async (data: registerForm) => {
     try {
        setSubmitting(true);
        const response = await axios.post('/api/users', data);
         setShowSuccess(true);
    } catch (error) {
        setSubmitting(false);
        console.error('Error al crear el ticket:', error);
        setError('Ocurrió un error insesperado');
    }
  };
      
  return (
    <div>
        
        <form 
        className="max-w-l"
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: "2vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            <Box style={{ width: "35%", borderRadius: "var(--radius-5)", display:'flex', justifyContent:'center'}} className="shadow-2xl">
                
                <Container size="1" style={{ margin: "8.5vh", width: '45vh' }}>
                    <Text><Strong>Registro de usuario</Strong></Text>
                    <TextField.Root style={{marginBottom:'2vh'}} placeholder='Nombre de usuario'/>
                    <TextField.Root style={{marginBottom:'2vh'}} placeholder='Nombre completo'/>
                    <TextField.Root style={{marginBottom:'2vh'}} type='password' placeholder='Crea una contraseña'/>
                    <TextField.Root style={{marginBottom:'2vh'}} placeholder='Posición: ej. Practicante, técnico, etc.'/>

                <div style={{marginBottom:'2vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
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
                        style={{width: '100%'}}>
                        <SegmentedControl.Item value="Xinya LatinAmerica">Xinya LatinAmerica</SegmentedControl.Item>
                        <SegmentedControl.Item value="Xinya Green Power">Xinya Green Power</SegmentedControl.Item>
                        <SegmentedControl.Item value="American Industries">American Industries</SegmentedControl.Item>
                    </SegmentedControl.Root>
                }/>
                </div>
                <div style={{display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button style={{margin:'2vh'}} type="button" color="red">Cancelar</Button>
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
                          Si, estoy seguro
                        </Button>
                      </Link>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
                <Button style={{margin:'2vh'}} type="submit" className="border-x-indigo-600">Registrar</Button>
                </div>
                </Container>
                
            </Box>
            
        </form>
    </div>
  )
}

export default registerUser

function setSubmitting(arg0: boolean) {
    throw new Error('Function not implemented.');
}
