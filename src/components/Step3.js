// src/components/Step4.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaFileAlt, FaImages, FaFilePdf, FaVideo, FaMicrophone } from 'react-icons/fa';

const schema = yup.object().shape({
  texte: yup.string(),
  images: yup.mixed(),
  documents: yup.mixed(),
  videos: yup.mixed(),
  sons: yup.mixed(),
});

const Step4 = ({ onNext, onPrev }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    onNext(data);
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-synergie-1 mb-6">Actualités, Photos et Blog</h2>
        <div className="flex items-center space-x-2">
          <FaFileAlt className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Texte</label>
        </div>
        <textarea 
          {...register('texte')} 
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
        />
        {errors.texte && <span className="text-red-500 text-sm">{errors.texte.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaImages className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Images</label>
        </div>
        <input 
          type="file" 
          {...register('images')}
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
          multiple
        />
        {errors.images && <span className="text-red-500 text-sm">{errors.images.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaFilePdf className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Documents</label>
        </div>
        <input 
          type="file" 
          {...register('documents')}
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
          multiple
        />
        {errors.documents && <span className="text-red-500 text-sm">{errors.documents.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaVideo className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Vidéos</label>
        </div>
        <input 
          type="file" 
          {...register('videos')}
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
          multiple
        />
        {errors.videos && <span className="text-red-500 text-sm">{errors.videos.message}</span>}
        
        <div className="flex items-center space-x-2">
          <FaMicrophone className="text-synergie-2" />
          <label className="block text-lg font-medium text-synergie-2">Sons</label>
        </div>
        <input 
          type="file" 
          {...register('sons')}
          className="mt-1 block w-full p-3 border border-synergie-3 rounded-lg shadow-sm focus:ring-synergie-2 focus:border-synergie-2"
          multiple
        />
        {errors.sons && <span className="text-red-500 text-sm">{errors.sons.message}</span>}
        
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

export default Step4;
