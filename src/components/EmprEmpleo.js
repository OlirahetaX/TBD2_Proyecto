import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CollapseSolici from './collapseSolici/CollapseSolici'
import { collection, getDocs, } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { useEffect } from 'react';

const EmprEmpleo = (params) => {
    const { cifEmpresa } = useParams()
    const { busEmpr, adsolicitud } = params
    const [solicitantes, setSolicitantes] = useState([])
    const [Empresa, setEmpresa] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sa = await busEmpr(cifEmpresa);
                setEmpresa(sa);

                const solicitantesQuerySnapshot = await getDocs(collection(db, 'Solicitantes'));
                const solicitantesData = solicitantesQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setSolicitantes(solicitantesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const [disabledButtons, setDisabledButtons] = useState({});

    const [empleo, SetEmpleo] = useState({
        idEmp: "",
        idSolicitante: "",
        cifempr: "",
        accion: ""
    })

    const handleClick = (elemento) => {
        const empl = {
            idEmp: Date.now(),
            idSolicitante: elemento.dni,
            cifempr: cifEmpresa,
            accion: "Empresa Envio Solicitud De Empleo "
        }
        SetEmpleo(empl)
        setDisabledButtons(prevState => ({
            ...prevState,
            [elemento.dni]: true
        }));
        adsolicitud(empl)
    }


    return (

        <div className='container'>
            <div className='container w-50 shadow rounded p-3' >
                <h3>({Empresa.cif}) {Empresa.nombre}</h3>
            </div>
            <br />
            <div className='container w-75 rounded shadow p-3'>
                <div class="list-group">

                    {solicitantes.map((elemento, index) => (
                        <div className="d-flex align-items-center">
                            <div className='w-75'>
                                < CollapseSolici solicitante={elemento} />
                            </div>
                            <div className='w-25'>
                                <button onClick={() => handleClick(elemento)} type="button" class="btn btn-success" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop" disabled={disabledButtons[elemento.dni]}>
                                    Enviar solicitud de empleo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Solicitud De Empleo Enviado!</h1>
                        </div>
                        <div class="modal-body">
                            Numero de solicitud {empleo.idEmp}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default EmprEmpleo
