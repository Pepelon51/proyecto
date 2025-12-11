'use client'
import "@radix-ui/themes/styles.css";
import {Box, Button, Container} from '@radix-ui/themes'

const TicketsPage = () => {
  return( 
  <div  className="max-w-l" style={{display: "flex", alignItems:"center", justifyContent:"center"}}>   
    <Box  style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-25)", justifyItems:"center"}}>
	    <Container size="4"> 
		  	  <Box style={{margin:"10px"}}  />
          <text id="idreport"># </text>
          <text id="requestName">Nombre de quien reporta: </text>
          <text id="proyect">Proyecto: </text>
          <text id="department">Departamento: </text>
          <text id="incidence">Incidencia: </text>
          <text id="description">Descripción: </text>
          <text id="status">Estatus: </text>
          <text id="createdAt">Generado: </text>    
          <Button color="teal">Ver</Button>
	    </Container>
    </Box>
  </div>

  )
}

export default TicketsPage
