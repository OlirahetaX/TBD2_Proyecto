import React from 'react'

const CollapseSolici = (params) => {
    const { solicitante } = params
    return (
        <>

            <button class="list-group-item list-group-item-action" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${solicitante.dni}`} aria-expanded="false" aria-controls="collapseExample">
                ({solicitante.dni}) {solicitante.nombre}
            </button>
            <div class="collapse" id={`collapse-${solicitante.dni}`}>
                <div className='container text-start'>
                    <div className="row">
                        <div className="col-md-4">Dni:</div>
                        <div className="col-md-8">{solicitante.dni}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Nombre:</div>
                        <div className="col-md-8">{solicitante.nombre}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Apellido:</div>
                        <div className="col-md-8">{solicitante.apellido}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Fecha de Nacimiento:</div>
                        <div className="col-md-8">{solicitante.fechaNac}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Genero:</div>
                        <div className="col-md-8">{solicitante.genero}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Direccion:</div>
                        <div className="col-md-8">{solicitante.direccion}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Celular:</div>
                        <div className="col-md-8">{solicitante.celular}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Correo:</div>
                        <div className="col-md-8">{solicitante.correo}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Nacionalidad:</div>
                        <div className="col-md-8">{solicitante.nacionalidad}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Id familiar:</div>
                        <div className="col-md-8">{solicitante.idfamiliar}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Parentesco:</div>
                        <div className="col-md-8">{solicitante.parentesco}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Habilidades:</div>
                        <div className="col-md-8">{solicitante.habilidades}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Historial:</div>
                        <div className="col-md-8">{solicitante.historial}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Institucion:</div>
                        <div className="col-md-8">{solicitante.institucion}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Especialidad:</div>
                        <div className="col-md-8">{solicitante.especialidad}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Indice:</div>
                        <div className="col-md-8">{solicitante.indice}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Estado Civil:</div>
                        <div className="col-md-8">{solicitante.estadoC}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Antecedentes Penales:</div>
                        <div className="col-md-8">{solicitante.antecedentes}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Servicio Militar:</div>
                        <div className="col-md-8">{solicitante.servicioM}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Requisitos Adicionales:</div>
                        <div className="col-md-8">{solicitante.requisitos}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Salario Esperado:</div>
                        <div className="col-md-8">{solicitante.salario}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Tipo de Contrato:</div>
                        <div className="col-md-8">{solicitante.contrato}</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CollapseSolici
