import React from 'react'

const CollapsePuesto = (params) => {
    const { puesto } = params
    return (
        <>
            <button class="list-group-item list-group-item-action" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${puesto.id_puesto}`} aria-expanded="false" aria-controls="collapseExample">
                {puesto.tipo_puesto}
            </button>
            <div class="collapse" id={`collapse-${puesto.id_puesto}`}>
                <div className='container text-start'>
                    <div className="row">
                        <div className="col-md-4">CIF Empresa:</div>
                        <div className="col-md-8">{puesto.id_empresa}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Tipo De Puesto:</div>
                        <div className="col-md-8">{puesto.tipo_puesto}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Descripcion:</div>
                        <div className="col-md-8">{puesto.descripcion}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Lugar:</div>
                        <div className="col-md-8">{puesto.lugar_empleo}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Sueldo:</div>
                        <div className="col-md-8">{puesto.sueldo}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Tipo de Contrato:</div>
                        <div className="col-md-8">{puesto.tipo_contrato}</div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default CollapsePuesto
