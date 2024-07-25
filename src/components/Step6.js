// src/components/Step6.js
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaBuilding, FaInfoCircle, FaImage } from 'react-icons/fa';

const schema = yup.object().shape({
  partenaires: yup.array().of(
    yup.object().shape({
      nom: yup.string(),
      logo: yup.mixed().nullable(),
      informations: yup.string().nullable(),
    })
  )
});

const Step6 = ({ onNext, onPrev }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "partenaires"
  });

  const [showModal, setShowModal] = useState(false);

  const onSubmit = data => {
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    onNext();
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-synergie-1 mb-6">Nos Partenaires et Soutiens</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <FaBuilding className="text-synergie-2" />
              <label className="block text-lg font-medium text-synergie-2">Nom du Partenaire</label>
            </div>
            <input 
              type="text"
              placeholder="Nom"
              {...register(`partenaires.${index}.nom`)}
              className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            {errors.partenaires?.[index]?.nom && <span className="text-red-500 text-sm">{errors.partenaires[index].nom.message}</span>}
            
            <div className="flex items-center space-x-2">
              <FaImage className="text-synergie-2" />
              <label className="block text-lg font-medium text-synergie-2">Logo du Partenaire</label>
            </div>
            <input 
              type="file"
              {...register(`partenaires.${index}.logo`)}
              className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            {errors.partenaires?.[index]?.logo && <span className="text-red-500 text-sm">{errors.partenaires[index].logo.message}</span>}
            
            <div className="flex items-center space-x-2">
              <FaInfoCircle className="text-synergie-2" />
              <label className="block text-lg font-medium text-synergie-2">Informations</label>
            </div>
            <textarea 
              placeholder="Informations"
              {...register(`partenaires.${index}.informations`)}
              className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            {errors.partenaires?.[index]?.informations && <span className="text-red-500 text-sm">{errors.partenaires[index].informations.message}</span>}
            
            <button type="button" onClick={() => remove(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ nom: '', logo: null, informations: '' })} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Ajouter un partenaire
        </button>
        {errors.partenaires && <span className="text-red-500 text-sm">{errors.partenaires.message}</span>}
        
        <div className="flex justify-between">
          <button type="button" onClick={onPrev} className="px-6 py-3 bg-synergie-3 text-white rounded-lg shadow-md hover:bg-synergie-2 transition duration-300">
            Précédent
          </button>
          <button type="submit" className="px-6 py-3 bg-synergie-2 text-white bg-gradient-to-r from-[#605DF4] to-[#EC6492] rounded-lg shadow-md hover:bg-synergie-1 transition duration-300">
            Suivant
          </button>
        </div>
      </form>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Merci d'avoir inscrit votre Patronage</h2>
            <p className="mb-4">Vos informations ont été transmises à notre équipe qualifiée.</p>
            <p className="mb-4">(Nous vous avons préparé le formulaire que nous fournirons pour l'inscription des enfants dans votre patronage, n'hésitez pas à y jeter un œil avant de quitter. Merci pour votre patience.)</p>
            <p className="font-bold">L'équipe SynergieInnovation.</p>
            <button onClick={handleContinue} className="mt-4 px-4 py-2 bg-synergie-2 text-white bg-gradient-to-r from-[#605DF4] to-[#EC6492] rounded-lg shadow-md hover:bg-synergie-1 transition duration-300">
              Continuer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step6;
