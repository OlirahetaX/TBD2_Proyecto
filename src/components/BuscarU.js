import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import EditarU from "./EditarU";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeLgAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import "./BuscarU.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";



const BuscarU = (params) => {
    const { busSoli, elimSoli } = params

    const [busqueda, setBusqueda] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [mostrarAlertaElim, setMostrarAlertaElim] = useState(false);
    const [usuario, setUsuario] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        celular: ""
    })

    const handleChange = (event) => {
        setBusqueda(event.target.value);
    };

    const eliminar = () => {
        elimSoli(usuario.dni);
        setMostrarAlertaElim(true);
        setMostrarTabla(false);
    };
    //cambiar de arreglo a base de datos
    const handleButtonClick = async () => {
        const encontrado = await busSoli(busqueda)
        if (encontrado != null) {
            console.log('Encontrado:', encontrado);

            const usu = {
                dni: encontrado.dni,
                nombre: encontrado.nombre,
                apellido: encontrado.apellido,
                celular: encontrado.celular,
            }
            setUsuario(usu)
            setMostrarAlertaElim(false);
            setMostrarAlerta(false);
            setMostrarTabla(true);
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
                    placeholder={"Ingrese DNI"}
                    onChange={handleChange}
                />
                <button className='btn btn-success' onClick={handleButtonClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {mostrarAlerta && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Solicitante no encontrado!</strong> Debes verificar que exista.
                    <button type="button" className="btn-close" onClick={() => setMostrarAlerta(false)} aria-label="Close"></button>
                </div>
            )}

            {mostrarTabla && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Primer Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Celular</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{usuario.dni}</th>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.celular}</td>
                            <td>
                                <Link to={`/EditarU/${usuario.dni}`}>
                                    <Button className="btn btn-warning" >Editar</Button>
                                </Link>
                                <text> </text>
                                <Link to={`/SoliEmpleo/${usuario.dni}/${usuario.nombre}`}>
                                    <Button className="btn btn-primary" >Solicitar Empleo</Button>
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
                <strong>Solicitante Eliminado!</strong>
                <button type="button" className="btn-close" onClick={() => setMostrarAlertaElim(false)} aria-label="Close"></button>
            </div>
            }

        </div>
    );
}

export default BuscarU