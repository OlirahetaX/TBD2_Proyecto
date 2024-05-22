import React,{useState,useRef} from "react";
import "./CrearU.css";
import { db } from '../firebaseConfig';
import { addDoc, collection } from "firebase/firestore";


const CrearE = (params) => {
    const EmpRef = useRef();
    
    const ref = collection(db,"Empresas");
    const { addEmpresa, busEmpr } = params
    const [tituloA, setTituloA] = useState("Empresa agregada!")
    const [alerta, setAlerta] = useState(false)
    const [Empresa, setEmpresa] = useState({
        cif: "",
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        fecha_creacion: ""
    })

    const handleChange = (event) => {
        const{name,value}=event.target;
        setEmpresa({ ...Empresa,  [name]:value })
    }

    const addEmpr = async(e) => {
        e.preventDefault();
        console.log(EmpRef.current.value)
        const encontrado = busEmpr(Empresa.cif)
        if (encontrado) {
            setTituloA("Ya existe una Empresa con el mismo CIF!")
        } else {
            setTituloA("Empresa agregada!")
            try{
                await addDoc(ref,Empresa);
            addEmpresa(Empresa)
            setEmpresa({
                cif: "",
                nombre: "",
                correo: "",
                telefono: "",
                direccion: "",
                fecha_creacion: ""
            });
        }catch(error){
            console.log(error);
        }
        }
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
                <input className="form-control" type="text" name="cif" placeholder="Cif" value={Empresa.cif} onChange={handleChange} ref={EmpRef} required />
                <br />
                <h5 >Nombre</h5>
                <input className="form-control" type="text" name="nombre" placeholder="Nombre" value={Empresa.nombre} onChange={handleChange} ref={EmpRef} required />
                <br />
                <h5 >Correo</h5>
                <input className="form-control" type="email" name="correo" placeholder="Correo" value={Empresa.correo} onChange={handleChange} ref={EmpRef} required />
                <br />
                <h5 >Telefono</h5>
                <input className="form-control" type="tel" name="telefono" placeholder="Telefono" value={Empresa.telefono} onChange={handleChange} ref={EmpRef} required />
                <br />
                <h5 >Direccion</h5>
                <input className="form-control" type="text" name="direccion" placeholder="Direccion" value={Empresa.direccion} onChange={handleChange} ref={EmpRef} required />
                <br />
                <h5 >Fecha de Creacion</h5>
                <input className="form-control" type="date" name="fecha_creacion" placeholder="Fecha de Creacion" value={Empresa.fecha_creacion} onChange={handleChange} ref={EmpRef} required />
                <br />
                <input className="btn btn-primary" type="submit" value="Crear" />
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

export default CrearE;