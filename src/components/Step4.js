// src/components/Step5.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaFileAlt, FaLink } from 'react-icons/fa';

const schema = yup.object().shape({
  texteDon: yup.string(),
  lienDon: yup.string().url('Le lien doit être une URL valide')
});

const Step5 = ({ onNext, onPrev }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    onNext(data);
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-synergie-1 mb-6">Page de Don</h2>
        <div className="flex items-center space-x-2">
          <FaFileAlt className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Texte pour la Page de Don</label>
        </div>
        <textarea 
          {...register('texteDon')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.texteDon && <span className="text-red-500 text-sm">{errors.texteDon.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaLink className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Lien vers la Page de Don</label>
        </div>
        <input 
          type="url" 
          {...register('lienDon')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.lienDon && <span className="text-red-500 text-sm">{errors.lienDon.message}</span>}
        
        <div className="flex justify-between">
          <button type="button" onClick={onPrev} className="px-6 py-3 bg-synergie-3 text-white rounded-lg shadow-md hover:bg-synergie-2 transition duration-300">
            Précédent
          </button>
          <button type="submit" className="px-6 py-3 bg-synergie-2 text-white bg-gradient-to-r from-[#605DF4] to-[#EC6492] rounded-lg shadow-md hover:bg-synergie-1 transition duration-300">
            Terminer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step5;
