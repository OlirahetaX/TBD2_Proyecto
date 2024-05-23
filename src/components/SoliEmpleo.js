import React,{useState} from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { useEffect } from 'react';

const SoliEmpleo = (params) => {

    const {  buscarSolici,adsolicitud,actualizarSolicitud } = params
    const { idSolici } = useParams()

    const [puestos,setPuestos] = useState([])

    useEffect(() => {
        const fetchDataFromFirestore = async () => {
            try {
                const puestosQuerySnapshot = await getDocs(collection(db, 'Puestos'));
                const puestosData = puestosQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setPuestos(puestosData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataFromFirestore();
    }, []);



    const solicitante = buscarSolici(idSolici)

    const [empleo, SetEmpleo] = useState({
        idEmp: "",
        idSolicitante: "",
        cifempr: "",
        accion: ""
    })

    const saveEmp = async(elementoN) => {
        const empleoE = {
            idEmp: Date.now(),
            idSolicitante: idSolici ,
            cifempr: elementoN,
            accion: "Solicitante Envio Curriculum"
        }
        SetEmpleo(empleoE)
        await actualizarSolicitud(idSolici)
        adsolicitud(empleoE)
    }

    return (
        <div className="container w-75">
            <div className=" shadow rounded p-3">
                <h3>Solicitante:  {idSolici}</h3>
            </div>
            <br /><br /><br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">CIF Empresa</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Lugar</th>
                        <th scope="col">Sueldo</th>
                        <th scope="col">Contrato</th>
                    </tr>
                </thead>
                <tbody>
                    {puestos.map((elemento, index) => (
                        <tr key={index}>
                            <td >{elemento.id_empresa}</td>
                            <td >{elemento.tipo_puesto}</td>
                            <td >{elemento.descripcion}</td>
                            <td >{elemento.lugar_empleo}</td>
                            <td >{elemento.sueldo}</td>
                            <td >{elemento.tipo_contrato}</td>
                            <td>
                                <button type="button" class="btn btn-success" data-bs-toggle="modal"  onClick={() => saveEmp(elemento.id_empresa)} 
                                data-bs-target="#staticBackdrop" disabled={solicitante.solicitud !== true ? "" : "disabled"}>
                                    Enviar Curriculum
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Curriculum Enviado!</h1>
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

            </table>
        </div>
    )
}

export default SoliEmpleo;