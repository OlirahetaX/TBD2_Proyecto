import React, { useState, useRef } from "react";
import "./CrearU.css";
import { db } from '../firebaseConfig';
import { addDoc, collection } from "firebase/firestore";

const CrearU = (params) => {
    //cambiar a app.js 

    const SolicRef = useRef();
    const ref = collection(db, "Solicitantes");

    const { addSoli, busSoli } = params
    const [alerta, setAlerta] = useState(false)
    const [tituloA, setTituloA] = useState("Solicitante agregado!")
    const [solicitante, setSolicitante] = useState({
        dni: '',
        nombre: "",
        apellido: "",
        fechaNac: "",
        genero: "Maculino",
        direccion: "",
        celular: "",
        correo: "",
        nacionalidad: "",
        idfamiliar: "",
        parentesco: "",
        habilidades: "",
        historial: "",
        institucion: "",
        especialidad: "",
        indice: "",
        estadoC: "Soltero/a",
        antecedentes: "",
        servicioM: "",
        solicitud: false,
        requisitos: "",
        salario: "",
        contrato: ""
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setSolicitante({ ...solicitante, [name]: value })

    }


    const addSolici = async (e) => {
        e.preventDefault();
        const encontrado = await busSoli(solicitante.dni)
        if (encontrado!=null) {
            setTituloA("Ya existe un solicitante con el mismo DNI!")
        } else {
            setTituloA("Solicitante agregado!")
            addSoli(solicitante)
            setSolicitante({
                dni: '',
                nombre: "",
                apellido: "",
                fechaNac: "",
                genero: "Maculino",
                direccion: "",
                celular: "",
                correo: "",
                nacionalidad: "",
                idfamiliar: "",
                parentesco: "",
                habilidades: "",
                historial: "",
                institucion: "",
                especialidad: "",
                indice: "",
                estadoC: "Soltero/a",
                antecedentes: "",
                servicioM: "",
                solicitud: false,
                requisitos: "",
                salario: "",
                contrato: ""
            });
        }
        setAlerta(true)
    }


    return (
        <div className="container w-75">
            <br />
            <h1>Crear solicitante</h1>
            <br />


            <form className="formBackground" onSubmit={addSolici} >
                <div style={{ display: "flex" }}>

                    <div style={{ flex: "1", marginRight: "10px" }}>
                        <div className=" shadow rounded p-3">
                            <h4>DATOS PERSONALES*</h4>
                            <h5 >Dni*</h5>
                            <input className="form-control" type="text" name="dni" placeholder="Dni" value={solicitante.dni} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Nombre*</h5>
                            <input className="form-control" type="text" name="nombre" placeholder="Nombre" value={solicitante.nombre} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Apellido*</h5>
                            <input className="form-control" type="text" name="apellido" placeholder="Apellido" value={solicitante.apellido} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Celular*</h5>
                            <input className="form-control" type="text" name="celular" placeholder="Celular" value={solicitante.celular} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Correo Electronico*</h5>
                            <input className="form-control" type="email" name="correo" placeholder="Correo Electronico" value={solicitante.correo} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Nacionalidad*</h5>
                            <input className="form-control" type="text" name="nacionalidad" placeholder="Nacionalidad" value={solicitante.nacionalidad} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Direccion*</h5>
                            <input className="form-control" type="text" name="direccion" placeholder="Direccion" value={solicitante.direccion} onChange={handleChange} ref={SolicRef} required />
                            <br />

                            <div style={{ display: "flex" }}>
                                <div style={{ flex: "1", marginRight: "10px" }}>
                                    <h5 >Género*</h5>
                                    <select name="genero" value={solicitante.genero} onChange={handleChange} ref={SolicRef} required>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                </div>
                                <div style={{ flex: "1", marginLeft: "10px" }}>
                                    <h5>Fecha de Nacimiento*</h5>
                                    <input type="date" id="fecha_nac" name="fechaNac" value={solicitante.fechaNac} onChange={handleChange} ref={SolicRef} required />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className=" shadow rounded p-3">
                            <h4>FAMILIARES</h4>
                            <h5 >¿Tiene un familiar buscando empleo?</h5>
                            <input className="form-control" type="text" name="idfamiliar" placeholder="ID Familiar" value={solicitante.idfamiliar} onChange={handleChange} ref={SolicRef} required />
                            <h5 >Parentesco</h5>
                            <input className="form-control" type="text" name="parentesco" placeholder="Parentesco" value={solicitante.parentesco} onChange={handleChange} ref={SolicRef} required />
                        </div>
                    </div>
                    <div style={{ flex: "1", marginLeft: "10px" }}>
                        <div className=" shadow rounded p-3">
                            <h4>DATOS PROFESIONALES</h4>
                            <h5 >Habilidades</h5>
                            <input className="form-control" type="text" name="habilidades" placeholder="Habilidades" value={solicitante.habilidades} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Historial laboral</h5>
                            <input className="form-control" type="text" name="historial" placeholder="Historial laboral" value={solicitante.historial} onChange={handleChange} ref={SolicRef} required />
                            <br /><br />
                        </div>
                        <br />
                        <div className=" shadow rounded p-3">
                            <h4>DATOS ACADEMICOS</h4>
                            <h5 >Institucion</h5>
                            <input className="form-control" type="text" name="institucion" placeholder="Institucion" value={solicitante.institucion} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Especialidad</h5>
                            <input className="form-control" type="text" name="especialidad" placeholder="Especialidad" value={solicitante.especialidad} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >Indice</h5>
                            <input className="form-control" type="number" name="indice" placeholder="Indice" value={solicitante.indice} onChange={handleChange} ref={SolicRef} required />
                            <br />
                        </div>
                        <br />
                        <div className=" shadow rounded p-3">
                            <h4>DATOS LEGALES</h4>
                            <h5 >Estado Civil</h5>
                            <select name="estadoC" value={solicitante.estadoC} onChange={handleChange} ref={SolicRef} required>
                                <option value="Soltero/a">Soltero/a</option>
                                <option value="Casado/a">Casado/a</option>
                                <option value="Comprometido/a">Comprometido/a</option>
                                <option value="Divorciado/a">Divorciado/a</option>
                            </select>
                            <br />
                            <h5 >Antecedentes Penales</h5>
                            <input className="form-control" type="text" name="antecedentes" placeholder="Antecedentes Penales" value={solicitante.antecedentes} onChange={handleChange} ref={SolicRef} required />
                            <br />
                            <h5 >servicio militar</h5>
                            <input className="form-control" type="text" name="servicioM" placeholder="Servicio Militar" value={solicitante.servicioM} onChange={handleChange} ref={SolicRef} required />
                            <br /><br />
                        </div>
                    </div>
                </div> <br />
                <div className=" shadow rounded p-3">
                    <h4>Requistos De Empleo</h4>
                    <h5 >Tipo de contrato</h5>
                    <select name="contrato" value={solicitante.contrato} onChange={handleChange} ref={SolicRef} required>
                        <option value="">Seleccione...</option>
                        <option value="Tiempo completo">Tiempo completo</option>
                        <option value="Tiempo parcial">Tiempo parcial</option>
                        <option value="Temporal">Temporal</option>
                        <option value="Por proyecto">Por proyecto</option>
                    </select>
                    <br />
                    <h5 >Requisitos</h5>
                    <input className="form-control" type="text" name="requisitos" placeholder="Requisitos Adicionales" value={solicitante.requisitos} onChange={handleChange} ref={SolicRef} required />
                    <br />
                    <h5 >Salario</h5>
                    <input className="form-control" type="number" name="salario" placeholder="Salario Esperado" value={solicitante.salario} onChange={handleChange} ref={SolicRef} required />
                    <br />
                </div>

                <br /><br />
                <input className="btn btn-primary shadow" type="submit" value="Crear" style={{ paddingRight: "200px", paddingLeft: "200px" }} />

            </form>

            {
                alerta &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{tituloA}</strong>
                    <button type="button" className="btn-close" onClick={() => setAlerta(false)} aria-label="Close"></button>
                </div>
            }
            <br /><br />
        </div>
    );
};

export default CrearU;