import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import EditarU from "./EditarU";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeLgAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import "./BuscarU.css";
import {Link} from "react-router-dom";
import { Button } from "react-bootstrap";



const BuscarE = (params) => {
    const { busEmpr, elimEmpr } = params

    const [busqueda, setBusqueda] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [mostrarAlertaElim, setMostrarAlertaElim] = useState(false);
    const [Empresa, setEmpresa] = useState({
        cif: "",
        nombre: "",
        correo: "",
        telefono: ""
    })

    const handleChange = (event) => {
        setBusqueda(event.target.value);
    };

    const eliminar = () => {
        if (Empresa) {
            elimEmpr(Empresa.id); 
            setMostrarAlertaElim(true);
            setMostrarTabla(false);
          }
    };

    const handleButtonClick = () => {
        const encontrado = busEmpr(busqueda)
        if (encontrado) {
            setMostrarTabla(true);
            setMostrarAlertaElim(false);
            setMostrarAlerta(false);
            setEmpresa(encontrado)
        } else {
            setMostrarTabla(false);
            setMostrarAlerta(true);
            setMostrarAlertaElim(false);
        }
    };

    return (
        <div className="App">
            <br />
            <div className="containerInput" >
                <input
                    className="form-control inputBuscar"
                    value={busqueda}
                    placeholder={"Ingrese CIF"}
                    onChange={handleChange}
                />
                <button className='btn btn-success' onClick={handleButtonClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {mostrarAlerta && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Empresa no encontrada!</strong> Debes verificar que exista.
                    <button type="button" className="btn-close" onClick={() => setMostrarAlerta(false)} aria-label="Close"></button>
                </div>
            )}

            {mostrarTabla && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Cif</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">correo</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{Empresa.cif}</th>
                            <td>{Empresa.nombre}</td>
                            <td>{Empresa.correo}</td>
                            <td>{Empresa.telefono}</td>
                            <td>
                                <Link to={`/EditarE/${Empresa.cif}`}>
                                    <Button className="btn btn-warning" >Editar</Button>
                                </Link>
                                <text> </text>
                                <Link to={`/PuestoT/${Empresa.cif}/${Empresa.nombre}`}>
                                    <Button className="btn btn-secondary" >Crear Puesto</Button>
                                </Link>
                                <text> </text>
                                <Link to={`/EmprEmpleo/${Empresa.cif}`}>
                                    <Button className="btn btn-info" >Buscar Empleados</Button>
                                </Link>
                                <text> </text>
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminar">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}

            {(
                <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Seguro que desea Eliminar
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={eliminar}>Si</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mostrarAlertaElim && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Empresa Eliminada!</strong>
                <button type="button" className="btn-close" onClick={() => setMostrarAlertaElim(false)} aria-label="Close"></button>
            </div>
            }

        </div>
    );
}

export default BuscarE