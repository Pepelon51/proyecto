import { Box, Button, Container, TextField } from '@radix-ui/themes'
import React from 'react'
import xinyaLogo from '../images/xinya-logo.png'
import Image from 'next/image'



export default function page() {
  return (
    <div  className="max-w-l" style={{marginTop:"15vh",display: "flex", alignItems:"center", justifyContent:"center"}}>   

    <Box className="shadow-2xl"style={{background: "white", borderRadius: "var(--radius-5)"}}>
	    <Container size="1" style={{margin:"35px" }}>
			    <Box py="1" />
                <Image className='contain-content' style={{margin:"3px"}}src={xinyaLogo} alt='logo' width={240} height={80}/>
                <p className="font-light" style={{ fontSize:"20px", textAlign:"center", marginTop:"4vh"}}>Iniciar sesión</p>
                <div>
                  <TextField.Root required type='email' style={{textAlign:"center", margin:"10px"}} placeholder="E-mail"></TextField.Root>
                  <TextField.Root required type='password'style={{textAlign:"center", margin:"10px"}} placeholder="Password"></TextField.Root>
                  <div style={{textAlign:"center", margin:"5px"}}><Button className="border-x-indigo-600" style={{fontSize:"1.5vh"}}>LOGIN</Button></div>
                </div>
	    </Container>
    </Box>
    </div>
  )
}
