import CollapseEmpr from "./collapseEmpr/CollapseEmpr"
import CollapsePuesto from "./collapsePuesto/CollapsePuesto"
import CollapseSolici from "./collapseSolici/CollapseSolici"
import { useState,useEffect } from "react";

import { collection, getDocs, } from 'firebase/firestore';
import { db } from "../firebaseConfig";

const Home = () => {
    const [solicitantes, setSolicitantes] = useState([]);
    const [Empresas, setEmpresas] = useState([]);
    const [Puestos, setPuestos] = useState([]);
    const [Solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        const fetchDataFromFirestore = async () => {
            try {
                // Fetch data for Solicitantes
                const solicitantesQuerySnapshot = await getDocs(collection(db, 'Solicitantes'));
                const solicitantesData = solicitantesQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setSolicitantes(solicitantesData);

                const empresasQuerySnapshot = await getDocs(collection(db, 'Empresas'));
                const empresasData = empresasQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setEmpresas(empresasData);

                const puestosQuerySnapshot = await getDocs(collection(db, 'Puestos'));
                const puestosData = puestosQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setPuestos(puestosData);

                const solicitudesQuerySnapshot = await getDocs(collection(db, 'Solicitudes'));
                const solicitudesData = solicitudesQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setSolicitudes(solicitudesData);

                // Do something with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataFromFirestore();
    }, []);

    return (

        <div>
            <h1>Home</h1>
            <br /><br /><br />

            <div className=" w-100" style={{ display: "flex", justifyContent: "space-between" }}>

                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>

                    <table class="table " >
                        <thead>
                            <tr>
                                <td><h5 style={{ textAlign: "center" }}>Solicitantes</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitantes.map((elemento, index) => (
                                <tr key={index}>
                                    <td ><CollapseSolici solicitante={elemento} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>
                    <table class="table " >
                        <thead>
                            <tr>
                                <td><h5 style={{ textAlign: "center" }}>Empresas</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {Empresas.map((elemento, index) => (
                                <tr key={index}>
                                    <td ><CollapseEmpr empresa={elemento} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br />
            <div className=" w-100" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>
                    <table class="table " >
                        <thead>
                            <tr>
                                <td><h5 style={{ textAlign: "center" }}>Puestos de Trabajo</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {Puestos.map((elemento, index) => (
                                <tr key={index}>
                                    <td ><CollapsePuesto puesto={elemento} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>

                    <h5 style={{ textAlign: "center" }}>Solicitudes</h5>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>Id Solicitud</th>
                                <th>DNI Solicitante</th>
                                <th>CIF Empresa</th>
                                <th >Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Solicitudes.map((elemento, index) => (
                                <tr key={index}>
                                    <td>{elemento.idEmp}</td>
                                    <td >{elemento.idSolicitante}</td>
                                    <td >{elemento.cifempr}</td>
                                    <td >{elemento.accion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}

export default Home