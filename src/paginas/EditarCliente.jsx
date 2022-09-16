import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const { id } = useParams()

  const [ cliente, setCliente ] = useState({})
  const [ cargando, setCargando ] = useState(true)

    useEffect(() => {
        const obtenerClientesAPI = async () => {
          try {
            const url = `http://localhost:4000/clientes/${id}`
    
            const respuesta = await fetch(url) // como es un GET solo necesito la url, es el método por default en FETCH API
            const resultado = await respuesta.json()    
            setCliente(resultado)    
          } catch (error) {
            console.log(error)
          }

          setCargando(!cargando) // Cambia el State a false

        }
    
        obtenerClientesAPI()
    
      }, [])
  
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>

        { cliente?.nombre ? (
          <Formulario 
            cliente={cliente}
            cargando={cargando}
          />
        ) : <p className="mt-4">Cliente ID no válido</p>}
        
    </>
  )
}

export default EditarCliente