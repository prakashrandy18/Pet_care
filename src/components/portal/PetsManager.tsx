import React, { useState, useEffect } from 'react'
import { supabase, getSession, getCustomerProfile } from '../../lib/supabase'
import PetCard from './PetCard'

export default function PetsManager() {
  const [pets, setPets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [customerId, setCustomerId] = useState<string | null>(null)
  
  // Form state
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    pet_name: '',
    pet_type: 'dog',
    breed: '',
    age: '',
    medical_notes: '',
    vaccination_status: 'unknown'
  })

  useEffect(() => {
    loadPets()
  }, [])

  const loadPets = async () => {
    try {
      const session = await getSession()
      if (!session) return

      // 1. Get or create the customer record
      const customer = await getCustomerProfile()
        
      if (!customer) {
         setLoading(false)
         return
      }
      
      setCustomerId(customer.id)

      // 2. Fetch their pets
      const { data: userPets } = await supabase
        .from('pet_profiles')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })
        
      setPets(userPets || [])
    } catch (err) {
      console.error('Error loading pets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this pet profile?')) return
    
    try {
      await supabase.from('pet_profiles').delete().eq('id', id)
      setPets(pets.filter(p => p.id !== id))
    } catch (err) {
      alert('Failed to delete pet profile')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerId) return
    
    setIsSubmitting(true)
    
    try {
      const { data, error } = await supabase
        .from('pet_profiles')
        .insert({
          ...formData,
          customer_id: customerId
        })
        .select()
        .single()
        
      if (error) throw error
      
      setPets([data, ...pets])
      setShowForm(false)
      setFormData({
        pet_name: '', pet_type: 'dog', breed: '', age: '', medical_notes: '', vaccination_status: 'unknown'
      })
    } catch (err) {
      console.error('Error saving pet:', err)
      alert('Failed to save pet profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your furry friends...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Pets</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Manage your pet profiles and medical info</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showForm 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' 
              : 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'
          }`}
        >
          {showForm ? 'Cancel' : '+ Add Pet'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Pet</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pet Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.pet_name}
                  onChange={e => setFormData({...formData, pet_name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pet Type *</label>
                <select 
                  value={formData.pet_type}
                  onChange={e => setFormData({...formData, pet_type: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary-500"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breed</label>
                <input 
                  type="text" 
                  value={formData.breed}
                  onChange={e => setFormData({...formData, breed: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2 years"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vaccination Status</label>
              <select 
                value={formData.vaccination_status}
                onChange={e => setFormData({...formData, vaccination_status: e.target.value})}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary-500"
              >
                <option value="unknown">Unknown</option>
                <option value="up-to-date">Up To Date</option>
                <option value="pending">Pending Renewal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medical Notes / Special Needs</label>
              <textarea 
                rows={3}
                value={formData.medical_notes}
                onChange={e => setFormData({...formData, medical_notes: e.target.value})}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary-500 resize-none"
                placeholder="Any allergies, medications, or behavioral notes..."
              />
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Pet Profile'}
              </button>
            </div>
          </form>
        </div>
      )}

      {pets.length === 0 && !showForm ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl border-dashed">
          <div className="text-5xl mb-4">🐕</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No pets added yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">Create profiles for your pets to make booking services faster and easier.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
          >
            Add Your First Pet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map(pet => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onDelete={handleDelete}
              onEdit={() => {
                alert('Edit coming soon!')
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
