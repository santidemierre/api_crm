import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [ clientes, setClientes ] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL

        const respuesta = await fetch(url) // como es un GET solo necesito la url, es el método por default en FETCH API
        const resultado = await respuesta.json()

        setClientes(resultado)

      } catch (error) {
        console.log(error)
      }
    }

    obtenerClientesAPI()

  }, [])

  const handleEliminar = async id => {
    const confirmar = confirm("Deseas eliminar este cliente?") 
  
    if(confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`

          const respuesta = await fetch(url, {
          method: 'DELETE' // DELETE -> Es para eliminar
      })

      await respuesta.json()

      const arrayClientes = clientes.filter(cliente => cliente.id !== id) // Quiero traerme todos los clientes que sean diferentes al id que estoy eliminando.
      setClientes(arrayClientes) // Lo pasamos a setClientes que es mi función que modifica mi estado

      } catch (error) {
        console.log(error)
      }
    }

  }  

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3'>Administra tus clientes</p>

        <table className='w-full mt-5 tablet-auto shadow bg-white'> {/* tablet-auto al hacer  */}
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Empresa</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          
          {/* Vamos a iterar sobre clientes */}
          <tbody>
            {clientes.map(cliente => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))} {/* Hago un return implícito para que retorne el componente <Cliente /> */}
          </tbody> 

        </table>
    </>
  )
}

export default Inicio