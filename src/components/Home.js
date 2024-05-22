import CollapseEmpr from "./collapseEmpr/CollapseEmpr"
import CollapsePuesto from "./collapsePuesto/CollapsePuesto"
import CollapseSolici from "./collapseSolici/CollapseSolici"

const Home = (params) => {

    const { solicitantes, empresas, puestos, solicitudes } = params
    return (

        <div>
            <h1>Home</h1>
            <br /><br /><br />

            <div className=" w-100" style={{ display: "flex", justifyContent: "space-between" }}>

                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>

                    <table class="table " >
                        <thead>
                            <tr>
                                <td><h5 style={{ textAlign: "center" }}>Solicitantes</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitantes.map((elemento, index) => (
                                <tr key={index}>
                                    <td ><CollapseSolici solicitante={elemento} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>
                    <table class="table " >
                        <thead>
                            <tr>
                                <td><h5 style={{ textAlign: "center" }}>Empresas</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map((elemento, index) => (
                                <tr key={index}>
                                    <td ><CollapseEmpr empresa={elemento} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br />
            <div className=" w-100" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>
                    <table class="table " >
                        <thead>
                            <tr>
                                <td><h5 style={{ textAlign: "center" }}>Puestos de Trabajo</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {puestos.map((elemento, index) => (
                                <tr key={index}>
                                    <td ><CollapsePuesto puesto={elemento} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="shadow rounded p-3 formBackground" style={{ flex: "1 1 50%", maxWidth: "50%", margin: "0 5px" }}>

                    <h5 style={{ textAlign: "center" }}>Solicitudes</h5>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>Id Solicitud</th>
                                <th>DNI solicitante</th>
                                <th>Solicitante</th>
                                <th >Empresa</th>
                                <th >Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((elemento, index) => (
                                <tr key={index}>
                                    <td>{elemento.idEmp}</td>
                                    <td >{elemento.idSolicitante}</td>
                                    <td >{elemento.nombreSolicitante}</td>
                                    <td >{elemento.nombreEmpr}</td>
                                    <td >{elemento.accion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}

export default Home