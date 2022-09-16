import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const VerCliente = () => {

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

    cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? 
        <p>No hay Resultados</p> : 
        (

        <div>
            
            <h1 className='font-black text-4xl text-blue-900'>Ver cliente: {cliente.nombre}</h1>
            <p className='mt-3 border-b'>Información del Cliente</p>

            <p className="text-xl text-gray-700 mt-10">
                <span className="text-gray-800 uppercase font-bold">Cliente: </span>
                {cliente.nombre}
            </p>
            <p className="text-xl text-gray-700 mt-4">
                <span className="text-gray-800 uppercase font-bold">Email: </span>
                {cliente.email}
            </p>
            <p className="text-xl text-gray-700 mt-4">
                <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
                {cliente.telefono}
            </p>
            {cliente.notas && (
                <p className="text-xl text-gray-700 mt-4">
                <span className="text-gray-800 uppercase font-bold">Notas: </span>
                {cliente.notas}
            </p>
            )}
        </div>
    )
  )
}

export default VerCliente