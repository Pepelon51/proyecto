'use client'
import { AlertDialog, Box, Button, Container, Flex, SegmentedControl, Strong, Text, TextArea, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { useForm, Controller } from "react-hook-form" 
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ReportForm{
  requestName: string;
  proyect: string;
  department: string;
  description: string;
  priority: string;
}

const newReportPage = () => {
  const router = useRouter();
  const {register, handleSubmit, control} = useForm<ReportForm>();
  const [reportId, setReportId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: ReportForm) => {
    try {
      const response = await axios.post('/api/tickets', data);
      setReportId(response.data.idreport);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      alert('Hubo un error al crear el ticket');
    }
  };

  return (
    <>
      <form 
        className="max-w-l" 
        onSubmit={handleSubmit(onSubmit)} 
        style={{ marginTop: "20vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
       
        <Box className="shadow-2xl" style={{ background: "white", borderRadius: "var(--radius-5)", margin: '' }}>
          <Container size="1" style={{ margin: "55px" }}>
            <Text style={{display:'flex', justifyContent:'center'}}size={'7'}><Strong>Consulta tu ticket</Strong></Text>
            <Box py="1" />
            <div style={{ marginBottom: '1vh', display:'flex', justifyContent:'center' }}>
              <Text style={{fontSize:'35px', marginRight:'1vh'}}><Strong>#</Strong></Text>
              <TextField.Root size='2' style={{ marginTop: '10px' }} placeholder='' {...register('requestName')} />
            </div>
            
            
            <Box style={{ marginTop: '15px', display:'flex', justifyContent:'center' }}>
              <Button type="submit" size="2" color='cyan'>Buscar</Button>
            </Box>
          </Container>
        </Box>
      </form>

      {/* AlertDialog de éxito */}
      <AlertDialog.Root open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>¡Ticket creado exitosamente!</AlertDialog.Title>
          <AlertDialog.Description size="3">
            Tu número de reporte es: <Strong style={{fontSize: '1.2em', color: 'green'}}>#{reportId}</Strong>
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button 
                variant="solid" 
                color="green"
                onClick={() => {
                  setShowSuccess(false);
                  router.push('./');
                }}
              >
                Aceptar
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default newReportPage