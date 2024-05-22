import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

import Home from './components/Home';
import CrearU from './components/CrearU';
import BuscarU from './components/BuscarU';
import NavBarExample from './Layout/navbar';
import EditarU from './components/EditarU';
import CrearE from './components/CrearE';
import BuscarE from './components/BuscarE';
import PuestoT from './components/PuestoT';
import SoliEmpleo from './components/SoliEmpleo';
import EmprEmpleo from './components/EmprEmpleo';
import EditarE from './components/EditarE';

function App() {
  const [solicitantes, setSolicitantes] = useState([
    {
      dni: "20194863",
      nombre: "Maria",
      apellido: "Bravo",
      fechaNac: "2006-01-19",
      genero: "Femenino",
      direccion: "Tegucigalpa, Francisco Morazan",
      celular: "99315378",
      correo: "mariabravo@gmail.com",
      nacionalidad: "Estados Unidos",
      idfamiliar: "No",
      parentesco: "No",
      habilidades: "Web developer",
      historial: "No",
      institucion: "UNAH",
      especialidad: "Ciencia de Datos",
      indice: "89",
      estadoC: "Divorciado/a",
      antecedentes: "No",
      servicioM: "No",
      solicitud: false,
      requisitos: "Buen ambiente laboral",
      salario: "24500",
      contrato: "Tiempo parcial"
    }
  ]);
  const [Empresas, setEmpresas] = useState([
    {
      cif: "123456",
        nombre: "TOYOTA",
        correo: "TOYOTA@YAHOO.COM",
        telefono: "789",
        direccion: "TEGUS",
        fecha_creacion: "1995-03-24"
    }
  ]);
  const [Puestos, setPuestos] = useState([]);
  const [Solicitudes, setSolicitudes] = useState([]);

  const addSolicitud = (usua) => {
    setSolicitudes([...Solicitudes, usua])
  }

  const addPuesto = (usua) => {
    setPuestos([...Puestos, usua])
  }

  const addSolicitante = (usua) => {
    setSolicitantes([...solicitantes, usua])
  }

  const buscarSolicitante = (dni) => {
    return (
      solicitantes.find(solicitante => solicitante.dni === dni)
    )
  }
  const elimSolicitante = (id) => {
    const newSolicitantes = solicitantes.filter(s => s.dni !== id)
    setSolicitantes(newSolicitantes)
  }
  /*
    useEffect(() => {
      //console.log(solicitantes)
  }, [solicitantes])
  */

  const addEmpresa = (empr) => {
    setEmpresas([...Empresas, empr])
  }

  const buscarEmpresa = (cif) => {
    return (
      Empresas.find(Empresa => Empresa.cif === cif)
    )
  }
  const elimEmpresa = (cif) => {
    const newEmpresas = Empresas.filter(Empresa => Empresa.cif !== cif)
    setEmpresas(newEmpresas)
  }

  //le pone true para que ya no siga enviando solicitudes
  const actualizarSolicitud = (dni) => {
    setSolicitantes((prevSolicitantes) =>
      prevSolicitantes.map((solicitante) =>
        solicitante.dni === dni ? { ...solicitante, solicitud: true } : solicitante
      )
    );
  };


  useEffect(() => {
    console.log(Solicitudes)
  }, [Solicitudes])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBarExample />}>
            <Route index element={<Home empresas={Empresas} solicitudes={Solicitudes} solicitantes={solicitantes} puestos={Puestos} />} />
            <Route path='CrearU' element={<CrearU addSoli={addSolicitante} busSoli={buscarSolicitante} />} />
            <Route path='BuscarU' element={<BuscarU busSoli={buscarSolicitante} elimSoli={elimSolicitante} />} />
            <Route path='EditarU/:idusuario' element={<EditarU addSoli={addSolicitante} busSoli={buscarSolicitante} elimSoli={elimSolicitante} />} />

            <Route path='CrearE' element={<CrearE addEmpresa={addEmpresa} busEmpr={buscarEmpresa} />} />
            <Route path='BuscarE' element={<BuscarE busEmpr={buscarEmpresa} elimEmpr={elimEmpresa} />} />
            <Route path='EditarE/:cifEmpr' element={<EditarE addEmpr={addEmpresa} busEmpr={buscarEmpresa} elimEmpr={elimEmpresa} />} />
            
            <Route path='EmprEmpleo/:cifEmpresa' element={<EmprEmpleo busEmpr={buscarEmpresa} solicitantes={solicitantes} adsolicitud={addSolicitud} />} />

            <Route path='SoliEmpleo/:idSolici/:nombreSolici' element={<SoliEmpleo actualizarSolicitud={actualizarSolicitud} puestos={Puestos} buscarSolici={buscarSolicitante} adsolicitud={addSolicitud} />} />

            <Route path='PuestoT/:cifEmpresa/:nombreEmpresa' element={<PuestoT addPuesto={addPuesto} />} />
            <Route path='*' element={<Navigate replace to={"/"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
