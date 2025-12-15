import { AlertDialog, Box, Button, Container, Flex, SegmentedControl, Strong, Text, TextArea, TextField } from '@radix-ui/themes'
import Link from 'next/link'


const newReportPage = () => {
  return (
    <div className="max-w-l" style={{ marginTop: "10vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box className="shadow-2xl" style={{ background: "white", borderRadius: "var(--radius-5)", margin: '' }}>
        <Container size="1" style={{ margin: "55px" }}>
          <Text style={{display:'flex'}}size={'5'}><Strong>Generar Ticket</Strong></Text>
          <Box py="1" />
          <div style={{ marginBottom: '1vh' }}>
            <Text>Proyecto al que perteneces:</Text>
          </div>

          <SegmentedControl.Root size='1' radius="full" defaultValue="Xinya LatinAmerica">
            <SegmentedControl.Item value="Xinya LatinAmerica">Xinya LatinAmerica</SegmentedControl.Item>
            <SegmentedControl.Item value="Xinya Green Power">Xinya Green Power</SegmentedControl.Item>
            <SegmentedControl.Item value="American Industries">American Industries</SegmentedControl.Item>
          </SegmentedControl.Root>

          <TextField.Root size='2' style={{ marginTop: '10px' }} placeholder='Nombre de quien reporta...' />
          <TextField.Root size='2' style={{ marginTop: '10px' }} placeholder='Departamento...' />
          <TextArea size='2' style={{ marginTop: '10px' }} placeholder='Descripción del problema...' />

          <div style={{ marginBottom: '10px', marginLeft: '5px', marginTop: '10px' }}>
            <Text>Nivel de urgencia:</Text>
          </div>
          <SegmentedControl.Root radius="full" defaultValue="Media">
            <SegmentedControl.Item style={{ color: 'red' }} value="Alta">Alta</SegmentedControl.Item>
            <SegmentedControl.Item style={{ color: 'orange' }} value="Media">Media</SegmentedControl.Item>
            <SegmentedControl.Item style={{ color: 'green' }} value="Baja">Baja</SegmentedControl.Item>
          </SegmentedControl.Root>
          <Box style={{ marginTop: '15px' }}>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red">Cancelar</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title></AlertDialog.Title>
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
            <Button style={{ marginLeft: '300px' }} size="2" color='grass'>Enviar</Button>
          </Box>

        </Container>
      </Box>

    </div>
  )
}

export default newReportPage