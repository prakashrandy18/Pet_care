import React, { useState } from 'react'

interface PetProfile {
  id: string
  pet_name: string
  pet_type: string
  breed?: string
  age?: string
  medical_notes?: string
  vaccination_status?: string
  image_url?: string
}

interface PetCardProps {
  pet: PetProfile
  onDelete?: (id: string) => void
  onEdit?: (pet: PetProfile) => void
}

export default function PetCard({ pet, onDelete, onEdit }: PetCardProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'dog': return '🐕'
      case 'cat': return '🐈'
      case 'bird': return '🦜'
      default: return '🐾'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header / Image Area */}
      <div className="h-32 bg-primary-100 dark:bg-primary-900/30 relative flex items-center justify-center">
        {pet.image_url ? (
          <img 
            src={pet.image_url} 
            alt={pet.pet_name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl opacity-50">{getIcon(pet.pet_type)}</span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {pet.pet_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {pet.breed ? `${pet.breed} • ` : ''} {pet.pet_type}
            </p>
          </div>
          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && (
                <button 
                  onClick={() => onEdit(pet)}
                  className="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  title="Edit Pet"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={() => onDelete(pet.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove Pet"
                >
                  🗑️
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {pet.age && (
             <div className="flex justify-between">
               <span className="text-gray-500 dark:text-gray-400">Age</span>
               <span className="font-medium text-gray-900 dark:text-white w-2/3 text-right">{pet.age}</span>
             </div>
          )}
          
          <div className="flex justify-between">
             <span className="text-gray-500 dark:text-gray-400">Vaccinations</span>
             <span className={`font-medium ${
               pet.vaccination_status === 'up-to-date' ? 'text-green-600 dark:text-green-400' 
               : pet.vaccination_status === 'pending' ? 'text-amber-600 dark:text-amber-400'
               : 'text-gray-900 dark:text-white'
             } w-2/3 text-right capitalize`}>
                {pet.vaccination_status || 'Unknown'}
             </span>
          </div>

          {pet.medical_notes && (
             <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-3">
               <span className="text-gray-500 dark:text-gray-400 block mb-1">Medical Notes</span>
               <p className="text-gray-700 dark:text-gray-300 font-medium whitespace-pre-wrap">
                 {pet.medical_notes}
               </p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
