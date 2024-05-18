import { useState } from "react";
import "./CrearU.css";

const CrearE = (params) => {

    const { addEmpresa } = params
    const [alerta, setAlerta] = useState(false)
    const [Empresa, setEmpresa] = useState({
        cif: "",
        nombre: "",
        correo: "",
        telefono: ""
    })

    const handleChange = ({ target }) => {
        setEmpresa({ ...Empresa, [target.name]: target.value })
    }

    const addEmpr = (e) => {
        e.preventDefault();
        addEmpresa(Empresa)
        setEmpresa({
            cif: "",
            nombre: "",
            correo: "",
            telefono: ""
        })
        setAlerta(true)
    }

    return (
        <div className="container w-75">
            <br />
            <h1>Crear empresa</h1>
            <br />
            <h4>DATOS BASICOS</h4>
            <form className=" shadow rounded p-3 formBackground" onSubmit={addEmpr}>
                <h5 >Cif</h5>
                <input className="form-control" type="text" name="cif" placeholder="Cif" value={Empresa.cif} onChange={handleChange} required />
                <br />
                <h5 >Nombre</h5>
                <input className="form-control" type="text" name="nombre" placeholder="Nombre" value={Empresa.nombre} onChange={handleChange} required />
                <br />
                <h5 >Correo</h5>
                <input className="form-control" type="email" name="correo" placeholder="Correo" value={Empresa.correo} onChange={handleChange} required />
                <br />
                <h5 >Telefono</h5>
                <input className="form-control" type="tel" name="telefono" placeholder="Telefono" value={Empresa.telefono} onChange={handleChange} required />
                <br />
                <input className="btn btn-primary" type="submit" value="Crear" />
            </form>

            {
                alerta &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Empresa agregada!</strong>
                    <button type="button" className="btn-close" onClick={() => setAlerta(false)} aria-label="Close"></button>
                </div>
            }
        </div>
    );
};

export default CrearE;