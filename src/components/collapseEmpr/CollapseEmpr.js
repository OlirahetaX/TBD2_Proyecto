import React from 'react'

const CollapseEmpr = (params) => {
    const { empresa } = params
    return (
        <>
            <button class="list-group-item list-group-item-action" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${empresa.cif}`} aria-expanded="false" aria-controls="collapseExample">
                {empresa.cif} {empresa.nombre}
            </button>
            <div class="collapse" id={`collapse-${empresa.cif}`}>
                <div className='container text-start'>
                    <div className="row">
                        <div className="col-md-4">CIF:</div>
                        <div className="col-md-8">{empresa.cif}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Nombre:</div>
                        <div className="col-md-8">{empresa.nombre}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Correo:</div>
                        <div className="col-md-8">{empresa.correo}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Telefono:</div>
                        <div className="col-md-8">{empresa.telefono}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Direccion:</div>
                        <div className="col-md-8">{empresa.direccion}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Fecha de Creacion:</div>
                        <div className="col-md-8">{empresa.fecha_creacion}</div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default CollapseEmpr
