'use client'
import { AlertDialog, Box, Button, Container, Flex, Strong, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'

interface TicketData {
  idreport: number;
  requestName: string;
  proyect: string;
  department: string;
  description: string;
  priority: string;
  status: string;
  solvedBy: string;
  createdAt: string;
  updatedAt: string;
}

const ViewReportPage = () => {
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!ticketId.trim()) {
      setError('Por favor ingresa un número de ticket');
      return;
    }

    try {
      setIsSearching(true);
      setError('');
      
      const response = await axios.get(`/api/tickets/${ticketId}`);
      
      setTicketData(response.data);
      setShowTicket(true);
      setIsSearching(false);
    } catch (error: any) {
      setIsSearching(false);
      if (error.response?.status === 404) {
        setError('Ticket no encontrado. Verifica el número e intenta nuevamente.');
      } else {
        setError('Error al consultar el ticket. Intenta nuevamente.');
      }
      console.error('Error al consultar el ticket:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-100 text-red-700';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-700';
      case 'CLOSED':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'Por revisar';
      case 'IN_PROGRESS':
        return 'En Progreso';
      case 'CLOSED':
        return 'Cerrado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div style={{ marginTop: "20vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <Box className="shadow-2xl" style={{ background: "white", borderRadius: "var(--radius-5)", padding: "3rem", maxWidth: "500px", width: "100%" }}>
          <Text style={{display:'flex', justifyContent:'center', marginBottom: '2rem'}} size={'7'}>
            <Strong>Consulta tu ticket</Strong>
          </Text>
          
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
          
          <div style={{ marginBottom: '2rem', display:'flex', alignItems:'center', justifyContent: 'center', gap: '10px' }}>
            <Text style={{fontSize:'35px'}}>
              <Strong>#</Strong>
            </Text>
            <TextField.Root 
              size='3' 
              placeholder='Número de ticket' 
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>
          
          <Box style={{ display:'flex', justifyContent:'center' }}>
            <Button 
              size="3" 
              color='cyan'
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </Box>
        </Box>
      </div>

      {/* AlertDialog con información del ticket */}
      <AlertDialog.Root open={showTicket} onOpenChange={setShowTicket}>
        <AlertDialog.Content maxWidth="600px" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
          <AlertDialog.Title style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Ticket #{ticketData?.idreport}
          </AlertDialog.Title>

          {ticketData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Estado */}
              <div>
                <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.5rem' }}>
                  Estado
                </Text>
                <span style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }} className={getStatusColor(ticketData.status)}>
                  {getStatusText(ticketData.status)}
                </span>
              </div>

              {/* Información General */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Reportado por
                  </Text>
                  <Text weight="medium">{ticketData.requestName}</Text>
                </div>
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Proyecto
                  </Text>
                  <Text weight="medium">{ticketData.proyect}</Text>
                </div>
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Departamento
                  </Text>
                  <Text weight="medium">{ticketData.department}</Text>
                </div>
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Prioridad
                  </Text>
                  <Text weight="medium">{ticketData.priority}</Text>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.5rem' }}>
                  Descripción
                </Text>
                <Box style={{
                  backgroundColor: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <Text>{ticketData.description}</Text>
                </Box>
              </div>

              {/* Resuelto por */}
              {ticketData.solvedBy && (
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Resuelto por
                  </Text>
                  <Text weight="medium">{ticketData.solvedBy}</Text>
                </div>
              )}

              {/* Fechas */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Fecha de creación
                  </Text>
                  <Text size="1">{formatDate(ticketData.createdAt)}</Text>
                </div>
                <div>
                  <Text size="2" style={{ color: 'gray', display: 'block', marginBottom: '0.25rem' }}>
                    Última actualización
                  </Text>
                  <Text size="1">{formatDate(ticketData.updatedAt)}</Text>
                </div>
              </div>
            </div>
          )}

          <Flex gap="3" mt="4" justify="end" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <AlertDialog.Action>
              <Button 
                variant="solid" 
                color="red"
                onClick={() => {
                  setShowTicket(false);
                  setTicketId('');
                  setTicketData(null);
                  setError('');
                }}
              >
                Cerrar
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default ViewReportPage