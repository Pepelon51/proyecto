'use client'
import { Box, Button, Container, TextField } from '@radix-ui/themes'
import xinyaLogo from '../images/xinya-logo.png'
import Image from 'next/image'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import SpinnerComponent from '../components/Spinner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginForm{
  user: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginForm) => {
    try {
      setSubmitting(true);
      setError('');
      
      console.log('Intentando login con:', data.user);
      
      const res = await signIn('credentials', {
        user: data.user,
        password: data.password,
        redirect: false // IMPORTANTE: mantener en false para manejar la respuesta
      });
      
      console.log('Respuesta de signIn:', res);
      
      if (res?.error) {
        console.error('Error de autenticación:', res.error);
        setError('Usuario o contraseña incorrectos');
        setSubmitting(false);
        return;
      }
      
      if (res?.ok) {
        console.log('Login exitoso, redirigiendo...');
        router.push('/dashboard'); // O la ruta que quieras
      }
      
    } catch (error) {
      console.error('Error en catch:', error);
      setError('Ocurrió un error inesperado');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-l mt-15" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
      <form
        className="max-w-l"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box 
          className="shadow-2xl"
          style={{background: "white", borderRadius: "var(--radius-5)"}}
        >
          <Container size="1" style={{ margin: "55px" }}>
            <Image 
              className='contain-content' 
              style={{margin:"3px"}}
              src={xinyaLogo} 
              alt='logo' 
              width={240} 
              height={80}
            />
            <p className="font-light" style={{ fontSize:"20px", textAlign:"center", marginTop:"4vh"}}>
              Iniciar sesión
            </p>
            
            {error && (
              <Box style={{ 
                padding: '10px', 
                backgroundColor: '#fee', 
                borderRadius: '5px', 
                marginBottom: '1rem',
                color: 'red',
                textAlign: 'center'
              }}>
                {error}
              </Box>
            )}
            
            <div>
              <TextField.Root 
                required 
                type='text' 
                style={{textAlign:"center", margin:"10px"}} 
                placeholder="User" 
                {...register('user')}
              />
              <ErrorMessage>{errors.user?.message}</ErrorMessage>
              
              <TextField.Root 
                required 
                type='password'
                style={{textAlign:"center", margin:"10px"}} 
                placeholder="Password" 
                {...register('password')}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              
              <Box style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button 
                  disabled={isSubmitting} 
                  type="submit" 
                  className="border-x-indigo-600" 
                  style={{fontSize:"1.8vh"}}
                >
                  {isSubmitting ? (
                    <>Ingresando... <SpinnerComponent/></>
                  ) : (
                    'LOGIN'
                  )}
                </Button>
              </Box>
            </div>
          </Container>
        </Box>
      </form>
    </div>
  )
}

export default Login