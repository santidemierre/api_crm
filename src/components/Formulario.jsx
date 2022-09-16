import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom' // Hook para redireccionar luego de enviar un formulario
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    // schema es un objeto con todos los campos que voy a tener y que forma
    const nuevoClientechema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El campo de nombre es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('email no válido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                    .typeError('El Número no es válido'),
    })

    // REST API
    const handleSubmit = async (valores) => {
        try {

            let respuesta

            if(cliente.id) {
                // Editando un registro - Tiene que ser un metodo PUT
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

                    respuesta = await fetch(url, {
                    method: 'PUT', // PUT -> Es para actualizar
                    body: JSON.stringify(valores), // Le enviamos la información
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            } else {
                // Nuevo registro
                const url = import.meta.env.VITE_API_URL // /cliente es el nombre que le puse en el db.json

                    respuesta = await fetch(url, {
                    method: 'POST', // POST -> Crear nuevo registro
                    body: JSON.stringify(valores), // Le enviamos la información
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }

            await respuesta.json()
            navigate('/clientes') // Una vez enviado el formuario los redirige a esta url

        } catch (error) {
            console.log(error)
        }
    }

  return (

    cargando ? <Spinner /> : (

        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '', // Si cliente?.nombre es undefined entonces marca un string vacio "".
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}
                validationSchema={nuevoClientechema}
            >

                {({errors, touched}) => { 
                    return (
                <Form
                    className='mt-10'
                >
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre:</label>
                        <Field 
                            id='nombre'
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100"
                            placeholder="Nombre del Cliente"
                            name="nombre"
                        />

                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta> // El componente tiene aprtura y cierre xq tiene un children
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa:</label>
                        <Field 
                            id='empresa'
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100"
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />

                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta> // El componente tiene aprtura y cierre xq tiene un children
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='email'
                        >E-mail:</label>
                        <Field 
                            id='email'
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-100"
                            placeholder="Email del Cliente"
                            name="email"
                        />

                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta> // El componente tiene aprtura y cierre xq tiene un children
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Teléfono:</label>
                        <Field 
                            id='telefono'
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-100"
                            placeholder="Teléfono del Cliente (sin catacteres)"
                            name="telefono"
                        />

                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta> // El componente tiene aprtura y cierre xq tiene un children
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas:</label>
                        <Field 
                            as="textarea"
                            id='notas'
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 h-40"
                            placeholder="Notas del Cliente"
                            name="notas"
                        />
                    </div>

                    <input 
                        type="submit"
                        value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente" } 
                        className="mt-5 w-full bg-blue-800 p-3 uppercase text-white font-bold hover:bg-blue-900 text-lg rounded-md"
                    />
                </Form>
                )}} 
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario