'use client'
import { Box, Button, Container, TextField } from '@radix-ui/themes'
import xinyaLogo from '../images/xinya-logo.png'
import Image from 'next/image'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

interface LoginForm{
  user: string;
  password: string;
}


const Login = () => {

  const {register, handleSubmit, control } = useForm<LoginForm>();
  const { formState: {errors}} = useForm<LoginForm>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false);
  const onSubmit = async (data: LoginForm) => {
    try {
      setSubmitting(true);
      const response = await axios.post('/api/users', data);
      setShowSuccess(true);
    } catch (error) {
      setSubmitting(false);
      console.error('Error: ', error);
      setError('Ocurrió un error insesperado');

    }
  };

  return (
    <div  className="max-w-l" style={{marginTop:"15vh",display: "flex", alignItems:"center", justifyContent:"center"}}>   
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box className="shadow-2xl"style={{background: "white", borderRadius: "var(--radius-5)"}}>
	    <Container size="1" style={{margin:"35px" }}>
			    <Box py="1" />
                <Image className='contain-content' style={{margin:"3px"}}src={xinyaLogo} alt='logo' width={240} height={80}/>
                <p className="font-light" style={{ fontSize:"20px", textAlign:"center", marginTop:"4vh"}}>Iniciar sesión</p>
                <div>
                  <TextField.Root required type='email' style={{textAlign:"center", margin:"10px"}} placeholder="User"></TextField.Root>
                  <ErrorMessage>{errors.user?.message}</ErrorMessage>
                  <TextField.Root required type='password'style={{textAlign:"center", margin:"10px"}} placeholder="Password"></TextField.Root>
                  <ErrorMessage>{errors.user?.message}</ErrorMessage>
                  <Box style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Button type="submit" className="border-x-indigo-600" style={{fontSize:"1.8vh"}}>LOGIN</Button>
                  </Box>
                </div>
                
	    </Container>
    </Box>
    </form>
    </div>
  )
}


export default Login