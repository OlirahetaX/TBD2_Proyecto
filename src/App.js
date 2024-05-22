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
import { collection, addDoc, getDocs,doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';


function App() {
  const EmpleoRef = useRef();
  const ref = collection(db,"Solicitudes");
const [solicitantes, setSolicitantes] = useState([]);
const [Empresas, setEmpresas] = useState([]);
const [Puestos, setPuestos] = useState([]);
const [Solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
        try {
            // Fetch data for Solicitantes
            const solicitantesQuerySnapshot = await getDocs(collection(db, 'Solicitantes'));
            const solicitantesData = solicitantesQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setSolicitantes(solicitantesData);
      
            const empresasQuerySnapshot = await getDocs(collection(db, 'Empresas'));
            const empresasData = empresasQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setEmpresas(empresasData);
      
            const puestosQuerySnapshot = await getDocs(collection(db, 'Puestos'));
            const puestosData = puestosQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPuestos(puestosData);
      
            const solicitudesQuerySnapshot = await getDocs(collection(db, 'Solicitudes'));
            const solicitudesData = solicitudesQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setSolicitudes(solicitudesData);

            // Do something with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchDataFromFirestore();
  }, []);

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
  const elimSolicitante = async (id) => {
    console.log(`Attempting to delete solicitante with ID: ${id}`);
    try {
      const solicitanteDocRef = doc(db, "Solicitantes", id);
      console.log(`Document reference created: ${solicitanteDocRef.path}`);
      await deleteDoc(solicitanteDocRef);
      console.log(`Document with ID ${id} deleted from Firestore.`);
      
      // Update the state to remove the deleted solicitante
      setSolicitantes(prevSolicitantes => prevSolicitantes.filter(solicitante => solicitante.id !== id));
      console.log(`Solicitante con ID ${id} eliminado correctamente.`);
    } catch (error) {
      console.error("Error deleting solicitante: ", error);
    }
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
  const elimEmpresa = async(id) => {
    try {
      const empresaDocRef = doc(db, "Empresas", id);
      await deleteDoc(empresaDocRef);
      setEmpresas(prevEmpresas => prevEmpresas.filter(empresa => empresa.id !== id));
      console.log(`Empresa con ID ${id} eliminada correctamente.`);
    } catch (error) {
      console.error("Error deleting empresa: ", error);
    }
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
