import { useState, useEffect } from "react";
import "./CrearU.css";
import { useParams } from 'react-router-dom';

const EditarE = (params) => {
    const { addEmpr, busEmpr, elimEmpr } = params
    const { cifEmpr } = useParams()
    const [tituloA, setTituloA] = useState("Empresa Editada!")
    const [alerta, setAlerta] = useState(false)

    const [empresa, setEmpresa] = useState({
        cif: "",
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        fecha_creacion: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sa = await busEmpr(cifEmpr);
                setEmpresa(sa);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleChange = ({ target }) => {
        setEmpresa({ ...empresa, [target.name]: target.value })
    }

    const guardarEmpr = (e) => {
        e.preventDefault();
        elimEmpr(cifEmpr)
        addEmpr(empresa)
        setEmpresa({
            cif: "",
            nombre: "",
            correo: "",
            telefono: "",
            direccion: "",
            fecha_creacion: ""
        })
        setAlerta(true)
    }

    useEffect(() => {
        const newE = busEmpr(cifEmpr);
        if (newE) {
            setEmpresa(newE);
        }

    }, [busEmpr, cifEmpr])

    return (

        <div className="container w-75">
            <br />
            <h1>Editar Empresa</h1>
            <br />
            <h4>DATOS BASICOS</h4>
            <form className=" shadow rounded p-3 formBackground" onSubmit={guardarEmpr}>
                <h5 >Cif</h5>
                <input className="form-control" type="text" name="cif" placeholder="Cif" value={empresa.cif} onChange={handleChange} readOnly />
                <br />
                <h5 >Nombre</h5>
                <input className="form-control" type="text" name="nombre" placeholder="Nombre" value={empresa.nombre} onChange={handleChange} required />
                <br />
                <h5 >Correo</h5>
                <input className="form-control" type="email" name="correo" placeholder="Correo" value={empresa.correo} onChange={handleChange} required />
                <br />
                <h5 >Telefono</h5>
                <input className="form-control" type="tel" name="telefono" placeholder="Telefono" value={empresa.telefono} onChange={handleChange} required />
                <br />
                <h5 >Direccion</h5>
                <input className="form-control" type="text" name="direccion" placeholder="Direccion" value={empresa.direccion} onChange={handleChange} required />
                <br />
                <h5 >Fecha de Creacion</h5>
                <input className="form-control" type="date" name="fecha_creacion" placeholder="Fecha de Creacion" value={empresa.fecha_creacion} onChange={handleChange} required />
                <br />
                <input className="btn btn-primary" type="submit" value="Guardar" />
                {
                    alerta &&
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{tituloA}</strong>
                        <button type="button" className="btn-close" onClick={() => setAlerta(false)} aria-label="Close"></button>
                    </div>
                }
            </form>
        </div>
    );
};

export default EditarE;