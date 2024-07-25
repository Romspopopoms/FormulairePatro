// src/components/Step2.js
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaProjectDiagram, FaCalendarAlt, FaFilePdf } from 'react-icons/fa';

const schema = yup.object().shape({
  projet: yup.string(),
  articles: yup.array().of(
    yup.object().shape({
      titre: yup.string(),
      description: yup.string(),
      image: yup.mixed().nullable()
    })
  ),
  pdf: yup.mixed(),
  joursOuverture: yup.array().of(
    yup.object().shape({
      jour: yup.string(),
      heureDebut: yup.string(),
      heureFin: yup.string()
    })
  )
});

const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const Step2 = ({ onNext, onPrev }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { fields: fieldsJoursOuverture, append: appendJourOuverture, remove: removeJourOuverture } = useFieldArray({
    control,
    name: "joursOuverture"
  });

  const { fields: fieldsArticles, append: appendArticle, remove: removeArticle } = useFieldArray({
    control,
    name: "articles"
  });

  const onSubmit = data => {
    onNext(data);
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-synergie-1 mb-6">Nos Activités</h2>
        <div className="flex items-center space-x-2">
          <FaProjectDiagram className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Présentation du Projet du Patronage</label>
        </div>
        <textarea 
          {...register('projet')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.projet && <span className="text-red-500 text-sm">{errors.projet.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Articles sur les Activités</label>
        </div>
        {fieldsArticles.map((item, index) => (
          <div key={item.id} className="space-y-2 mb-4">
            <input 
              type="text"
              placeholder="Titre"
              {...register(`articles.${index}.titre`)}
              className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            {errors.articles?.[index]?.titre && <span className="text-red-500 text-sm">{errors.articles[index].titre.message}</span>}
            <textarea 
              placeholder="Description"
              {...register(`articles.${index}.description`)}
              className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            {errors.articles?.[index]?.description && <span className="text-red-500 text-sm">{errors.articles[index].description.message}</span>}
            <input 
              type="file"
              {...register(`articles.${index}.image`)}
              className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            {errors.articles?.[index]?.image && <span className="text-red-500 text-sm">{errors.articles[index].image.message}</span>}
            <button type="button" onClick={() => removeArticle(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendArticle({ titre: '', description: '', image: null })} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Ajouter un article
        </button>
        {errors.articles && <span className="text-red-500 text-sm">{errors.articles.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaFilePdf className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Projet Pédagogique (PDF)</label>
        </div>
        <input 
          type="file"
          {...register('pdf')}
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.pdf && <span className="text-red-500 text-sm">{errors.pdf.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Jours d'ouverture et Horaires</label>
        </div>
        {fieldsJoursOuverture.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-4 mb-2">
            <select 
              {...register(`joursOuverture.${index}.jour`)}
              className="block w-1/3 p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            >
              <option value="">Sélectionnez un jour</option>
              {joursSemaine.map(jour => (
                <option key={jour} value={jour}>{jour}</option>
              ))}
            </select>
            <input 
              type="time"
              {...register(`joursOuverture.${index}.heureDebut`)}
              className="block w-1/3 p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            <input 
              type="time"
              {...register(`joursOuverture.${index}.heureFin`)}
              className="block w-1/3 p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
            />
            <button type="button" onClick={() => removeJourOuverture(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendJourOuverture({ jour: '', heureDebut: '', heureFin: '' })} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Ajouter un jour
        </button>
        {errors.joursOuverture && <span className="text-red-500 text-sm">{errors.joursOuverture.message}</span>}
        
        <div className="flex justify-between">
          <button type="button" onClick={onPrev} className="px-6 py-3 bg-synergie-3 text-white rounded-lg shadow-md hover:bg-synergie-2 transition duration-300">
            Précédent
          </button>
          <button type="submit" className="px-6 py-3 bg-synergie-2 text-white bg-gradient-to-r from-[#605DF4] to-[#EC6492] rounded-lg shadow-md hover:bg-synergie-1 transition duration-300">
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
