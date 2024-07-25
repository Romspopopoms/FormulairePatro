// src/components/Step1.js
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaBook, FaUsers, FaUserTie } from 'react-icons/fa';

const schema = yup.object().shape({
  histoire: yup.string(),
  equipe: yup.array().of(
    yup.object().shape({
      role: yup.string(),
      nom: yup.string(),
    })
  )
});

const roles = [
  'Conseil d\'administration',
  'Directeur',
  'Animateur',
  'Stagiaire',
  'Adjoint'
];

const Step1 = ({ onNext }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipe'
  });

  const onSubmit = data => {
    onNext(data);
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-synergie-1 mb-6">Qui Sommes-Nous ?</h2>
        <div className="flex items-center space-x-2">
          <FaBook className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Histoire et Pédagogie des Patronages</label>
        </div>
        <textarea 
          {...register('histoire')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.histoire && <span className="text-red-500 text-sm">{errors.histoire.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaUsers className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Présentation de l'Équipe</label>
        </div>

        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <FaUserTie className="text-synergie-2" />
              <select
                {...register(`equipe.${index}.role`)}
                className="block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
              >
                <option value="">Sélectionnez un rôle</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.equipe?.[index]?.role && <span className="text-red-500 text-sm">{errors.equipe[index].role.message}</span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Nom"
                {...register(`equipe.${index}.nom`)}
                className="block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
              />
              {errors.equipe?.[index]?.nom && <span className="text-red-500 text-sm">{errors.equipe[index].nom.message}</span>}
            </div>
            <button type="button" onClick={() => remove(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
              Supprimer
            </button>
          </div>
        ))}
        
        <button type="button" onClick={() => append({ role: '', nom: '' })} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Ajouter un membre
        </button>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-3 bg-synergie-2 text-white rounded-lg shadow-md hover:bg-synergie-1 transition duration-300">
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
