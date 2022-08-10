import {useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import Spinner from "../components/Spinner";

const VerCliente = () => {
    const [ cliente, setCliente] = useState({});
    const [ cargando,setCargando] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
           try {
               const url = `http://localhost:4000/clientes/${id}`;
               const respuesta = await fetch(url);
               const resultado = await respuesta.json();
               setCliente(resultado);
           }catch (error) {
               console.log(error);
           }
           setTimeout(() => {
               setCargando(!cargando);
           },100)
       }

       obtenerClienteAPI();

    },[]);

    const { nombre,email,telefono,empresa,notas } = cliente

    console.log(cargando);

    return (
            cargando ? <Spinner /> :
            Object.keys(cliente).length === 0 ? <p> No hay  Resultado </p> : (
            <div>
                <>
                <h1 className="font-black text-4xl text-blue-800">Ver Cliente : {nombre}</h1>
                <p className="mt-3">Información del cliente</p>

                {nombre &&  (
                    <p className="text-2xl text-gray-600 mt-6">
                    <span className="text-gray-800 uppercase font-bold">Cliente:</span>
                     {nombre}
                    </p>
                )}
                {email && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Email:</span>
                        {email}
                    </p>
                )}

                {telefono && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold mt-4">Telefono:</span>
                        {telefono}
                    </p>
                )}
                {empresa && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold mt-4">Empresa:</span>
                        {empresa}
                    </p>
                )}

                {notas && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Notas:</span>
                        {notas}
                    </p>
                    )}
                </>
            </div>
        )
    )
};

export default VerCliente;