// src/components/Step3.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const schema = yup.object().shape({
  nom: yup.string(),
  prenom: yup.string(),
  age: yup.number().min(1, 'L\'âge doit être supérieur à 0'),
  telephone: yup.string().matches(/^[0-9]+$/, 'Le numéro de téléphone doit être valide'),
  email: yup.string().email('L\'adresse mail doit être valide'),
});

const Step3 = ({ onNext, onPrev, onReset }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    onNext(data);
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-synergie-1 mb-6">Inscrire Son Enfant</h2>
        
        <div className="flex items-center space-x-2">
          <FaUser className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Nom</label>
        </div>
        <input 
          type="text" 
          {...register('nom')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.nom && <span className="text-red-500 text-sm">{errors.nom.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaUser className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Prénom</label>
        </div>
        <input 
          type="text" 
          {...register('prenom')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaUser className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Âge</label>
        </div>
        <input 
          type="number" 
          {...register('age')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaPhone className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Numéro de téléphone des parents</label>
        </div>
        <input 
          type="text" 
          {...register('telephone')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.telephone && <span className="text-red-500 text-sm">{errors.telephone.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Adresse mail des parents</label>
        </div>
        <input 
          type="email" 
          {...register('email')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        
        <div className="flex justify-between">
          <button type="button" onClick={onPrev} className="px-6 py-3 bg-synergie-3 text-white rounded-lg shadow-md hover:bg-synergie-2 transition duration-300">
            Précédent
          </button>
          <button type="button" onClick={onReset} className="px-6 py-3 bg-synergie-2 text-white bg-gradient-to-r from-[#605DF4] to-[#EC6492] rounded-lg shadow-md hover:bg-synergie-1 transition duration-300">
            Revenir à la page d'accueil
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
