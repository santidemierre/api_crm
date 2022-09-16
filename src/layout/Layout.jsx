// Ruta principal de clientes. Este layout se comparte en todos los componentes

import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {

    const location = useLocation() // Hook de Router-dom
    const urlActual = location.pathname // Para saber en qué pagina estoy

  return (
    <div className="md:flex md:min-h-screen bg-gray-100"> {/* md:min-h-screen: Su tamaño minimo de altura tiene que ser toda la altura que tengamos */}
        <div className="md:w-1/4 bg-blue-900 px-5 py-10">
            <h2 className="text-4xl font-black text-center text-white">CRM - Clientes</h2>

            <nav className="mt-10">
                <Link 
                    to="/clientes"
                    className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                >Clientes</Link>
                <Link
                    className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/clientes/nuevo"
                >Nuevo Cliente</Link>
            </nav>
        </div>
        <div className="md:w-3/4 p-10 md:h-screen overflow-scroll"> {/* md:h-screen= La altura va a ser lo que mida la pantalla - overflow-scroll= Para que tenga scroll solo en esta parte de la pantalla*/}
            <Outlet />
        </div>

    </div>
  )
}

export default Layout