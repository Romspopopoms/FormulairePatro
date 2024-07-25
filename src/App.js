// src/App.js
import "./App.css";
import React from 'react';
import MultiStepForm from './components/MultiStepForm';
import logo from './assets/V4 long W.png'; // Assurez-vous de mettre le bon chemin vers votre image

function App() {
  return (
    <div className="App min-h-screen flex flex-col" style={{ backgroundColor: '#DEF1FF' }}>
      <header className="flex items-center justify-center p-4" style={{
        background: 'linear-gradient(to right, #605DF4 0%, #EC6492 100%)',
        height: '100px'
      }}>
        <img src={logo} alt="Synergie Innovation" className="h-12" /> {/* Taille de l'image ajustée à votre besoin */}
      </header>
      <div className="flex-grow p-8">
        <h1 className="font-baloo font-extrabold text-3xl text-gray-800 mb-6 text-center">
          Création de Site pour votre Patronage
        </h1>
        <MultiStepForm />
      </div>
    </div>
  );
}

export default App;
