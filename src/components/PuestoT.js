import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PuestoT = (params) => {
    const { addPuesto } = params
    const { cifEmpresa } = useParams()
    const [alerta, setalerta] = useState(false)
    const [puestoTrabajo, setPuestoTrabajo] = useState({
        id_puesto: Date.now(),
        id_empresa: cifEmpresa,
        tipo_puesto: "",
        descripcion: "",
        lugar_empleo: "",
        sueldo: "",
        tipo_contrato: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPuestoTrabajo({ ...puestoTrabajo, [name]: value })
    }

    const addPuestoT = async (e) => {
        
        e.preventDefault();
        addPuesto(puestoTrabajo)
        setPuestoTrabajo({
            id_puesto: "",
            id_empresa: "",
            tipo_puesto: "",
            descripcion: "",
            lugar_empleo: "",
            sueldo: "",
            tipo_contrato: "",
        });
        setalerta(true)
    }

    return (
        <div className="container w-50">
            <h1>Crear Puesto De Trabajo</h1>
            <h5 style={{ textAlign: "center" }}>Empresa:  {cifEmpresa} </h5>

            <form className=" shadow rounded p-3 " onSubmit={addPuestoT}>
                <h5 >Tipo de Puesto</h5>
                <input className="form-control" type="text" name="tipo_puesto" placeholder="Tipo de Puesto" value={puestoTrabajo.tipo_puesto} onChange={handleChange}  required />
                <br />
                <h5 >Descripción</h5>
                <input className="form-control" type="text" name="descripcion" placeholder="Descripcion" value={puestoTrabajo.descripcion} onChange={handleChange}  required />
                <br />
                <h5 >Lugar de Empleo</h5>
                <input className="form-control" type="text" name="lugar_empleo" placeholder="Lugar de Empleo" value={puestoTrabajo.lugar_empleo} onChange={handleChange}  required />
                <br />
                <h5 >Sueldo</h5>
                <input className="form-control" type="number" name="sueldo" placeholder="Sueldo" value={puestoTrabajo.sueldo} onChange={handleChange} required />
                <br />
                <h5 >Tipo de Contrato</h5>
                <select id="tipo_contrato" name="tipo_contrato" value={puestoTrabajo.tipo_contrato} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Tiempo parcial">Tiempo parcial</option>
                    <option value="Temporal">Temporal</option>
                    <option value="Por proyecto">Por proyecto</option>
                </select>
                <br /><br />
                <input className="btn btn-primary shadow" type="submit" value="Crear" style={{ paddingRight: "200px", paddingLeft: "200px" }} />
            </form>
            {alerta && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Puesto de trabajo agregado!</strong>
                    <button type="button" className="btn-close" onClick={() => setalerta(false)} aria-label="Close"></button>
                </div>)
            }
        </div>
    )
}

export default PuestoT;