'use client'
import { AlertDialog, Box, Button, Callout, Container, Flex, SegmentedControl, Strong, Text, TextArea, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { useForm, Controller } from "react-hook-form" 
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver} from '@hookform/resolvers/zod'
import { createReportSchema } from '../validationSchemas'
import { z } from 'zod'
import ErrorMessage from '../components/ErrorMessage'
import SpinnerComponent from '../components/Spinner'

type ticketForm = z.infer<typeof createReportSchema>;

interface ReportForm{
  requestName: string;
  proyect: string;
  department: string;
  description: string;
  priority: string;
}

const newReportPage = () => {
  const router = useRouter();
  const {register, handleSubmit, control, formState: {errors} } = useForm<ReportForm>({
    resolver: zodResolver(createReportSchema)}
  );
  const [reportId, setReportId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false);

 
  const onSubmit = async (data: ReportForm) => {
    try {
      setSubmitting(true);
      const response = await axios.post('/api/tickets', data);
      setReportId(response.data.idreport);
      setShowSuccess(true);
    } catch (error) {
      setSubmitting(false);
      console.error('Error al crear el ticket:', error);
      setError('Ocurrió un error insesperado');

    }
  };

  return (
    <>
    <div>
      {error && <Callout.Root className="max-w-l" color='red' style={{display:'flex', alignItems:'center', justifyContent:'center',alignContent:'center'}}>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form
        className="max-w-l"
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: "10vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
       
        <Box className="shadow-2xl" style={{ background: "white", borderRadius: "var(--radius-5)"}}>
          <Container size="1" style={{ margin: "55px" }}>
            <Text style={{display:'flex'}}size={'5'}><Strong>Generar Ticket</Strong></Text>
            <Box py="1" />
            <div style={{ marginBottom: '1vh' }}>
              <Text>Proyecto al que perteneces:</Text>
            </div>
            <Controller 
              name="proyect" 
              control={control} 
              defaultValue="Xinya LatinAmerica"
              render={({field}) => 
                <SegmentedControl.Root size='1' radius="full" value={field.value} onValueChange={field.onChange}>
                  <SegmentedControl.Item value="Xinya LatinAmerica">Xinya LatinAmerica</SegmentedControl.Item>
                  <SegmentedControl.Item value="Xinya Green Power">Xinya Green Power</SegmentedControl.Item>
                  <SegmentedControl.Item value="American Industries">American Industries</SegmentedControl.Item>
                </SegmentedControl.Root>
              }
            />
            
            <TextField.Root size='2' style={{ marginTop: '10px' }} placeholder='Nombre de quien reporta...' {...register('requestName')} />
            <ErrorMessage>{errors.requestName?.message}</ErrorMessage>
            <TextField.Root size='2' style={{ marginTop: '10px' }} placeholder='Departamento...' {...register('department')} />
            <ErrorMessage>{errors.department?.message}</ErrorMessage>
            <TextArea size='2' style={{ marginTop: '10px' }} placeholder='Descripción del problema...' {...register('description')} />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <div style={{ marginBottom: '10px', marginLeft: '5px', marginTop: '10px' }}>
              <Text>Nivel de urgencia:</Text>
            </div>
            <Controller
              name="priority" 
              control={control} 
              defaultValue="Media"
              render={({field}) =>
                <SegmentedControl.Root radius="full" value={field.value} onValueChange={field.onChange}>
                  <SegmentedControl.Item style={{ color: 'red' }} value="Alta">Alta</SegmentedControl.Item>
                  <SegmentedControl.Item style={{ color: 'orange' }} value="Media">Media</SegmentedControl.Item>
                  <SegmentedControl.Item style={{ color: 'green' }} value="Baja">Baja</SegmentedControl.Item>
                </SegmentedControl.Root>
              }
            />
            
            <Box style={{ marginTop: '15px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button type="button" color="red">Cancelar</Button>
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
              <Button disabled={isSubmitting} type="submit" style={{ marginLeft: '300px' }} size="2" color='grass'>Enviar {isSubmitting &&<SpinnerComponent/>}</Button>
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
      </div>
    </>
  )
}

export default newReportPage