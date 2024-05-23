import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

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

import { collection, query, where, getDocs, getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { update } from 'firebase/database';



function App() {

  const addSolicitud = async (usua) => {
    try {
      await setDoc(doc(db, 'Solicitudes', `${usua.idEmp}`), usua);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  const addPuesto = async (usua) => {
    try {
      await setDoc(doc(db, 'Puestos', `${usua.id_puesto}`), usua);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  const addSolicitante = async (usua) => {
    //setSolicitantes([...solicitantes, usua])
    try {
      await setDoc(doc(db, 'Solicitantes', `${usua.dni}`), usua);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  const buscarSolicitante = async (dni) => {
    try {
      const docRef = doc(db, 'Solicitantes', dni);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data
      } else {
        return null
      }

    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }

  const elimSolicitante = async (id) => {

    try {
      await deleteDoc(doc(db, "Solicitantes", id));
    } catch (error) {
      console.log(error)
    }
  }

  const addEmpresa = async (empr) => {
    try {
      await setDoc(doc(db, 'Empresas', `${empr.cif}`), empr);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  const buscarEmpresa = async (cif) => {
    try {
      const docRef = doc(db, 'Empresas', cif);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Exite empresa")
        const data = docSnap.data();
        return data
      } else {
        console.log("no Exite empresa")
        return null
      }

    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }

  const elimEmpresa = async (id) => {
    try {
      await deleteDoc(doc(db, "Empresas", id));
    } catch (error) {
      console.log(error)
    }
  }
  const elimPuestosPorEmpresa = async (id_empresa) => {
    try {
      // Crear una referencia a la colección 'Puestos'
      const puestosRef = collection(db, "Puestos");

      // Crear una consulta para obtener los documentos donde 'id_empresa' sea igual al id proporcionado
      const q = query(puestosRef, where("id_empresa", "==", id_empresa));

      // Obtener los documentos que coincidan con la consulta
      const querySnapshot = await getDocs(q);

      // Iterar sobre cada documento y eliminarlo
      const deletePromises = querySnapshot.docs.map((document) => deleteDoc(doc(db, "Puestos", document.id)));

      // Esperar a que todas las promesas de eliminación se resuelvan
      await Promise.all(deletePromises);

      console.log(`Se han eliminado los puestos de la empresa con id: ${id_empresa}`);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarSolicitud = async (dni) => {
    try {
      console.log("ban1")
      await update(doc(db, 'Solicitantes', dni), { solicitud: true })
      console.log("ban2")
    } catch (error) {
      console.log(error)
      console.log("ban3")
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBarExample />}>
            <Route index element={<Home />} />
            <Route path='CrearU' element={<CrearU addSoli={addSolicitante} busSoli={buscarSolicitante} />} />
            <Route path='BuscarU' element={<BuscarU busSoli={buscarSolicitante} elimSoli={elimSolicitante} />} />
            <Route path='EditarU/:idusuario' element={<EditarU addSoli={addSolicitante} busSoli={buscarSolicitante} elimSoli={elimSolicitante} />} />

            <Route path='CrearE' element={<CrearE addEmpresa={addEmpresa} busEmpr={buscarEmpresa} />} />
            <Route path='BuscarE' element={<BuscarE elimPuestosPorEmpresa={elimPuestosPorEmpresa} busEmpr={buscarEmpresa} elimEmpr={elimEmpresa} />} />
            <Route path='EditarE/:cifEmpr' element={<EditarE addEmpr={addEmpresa} busEmpr={buscarEmpresa} elimEmpr={elimEmpresa} />} />

            <Route path='EmprEmpleo/:cifEmpresa' element={<EmprEmpleo busEmpr={buscarEmpresa} adsolicitud={addSolicitud} />} />

            <Route path='SoliEmpleo/:idSolici/:nombreSolici' element={<SoliEmpleo actualizarSolicitud={actualizarSolicitud} buscarSolici={buscarSolicitante} adsolicitud={addSolicitud} />} />

            <Route path='PuestoT/:cifEmpresa/:nombreEmpresa' element={<PuestoT addPuesto={addPuesto} />} />
            <Route path='*' element={<Navigate replace to={"/"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
