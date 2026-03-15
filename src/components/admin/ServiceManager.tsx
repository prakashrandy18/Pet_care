import React, { useState, useEffect } from 'react'
import { getServices, createService, updateService, deleteService } from '../../lib/supabase'

interface Props {
  showToast: (msg: string, type?: 'success' | 'error') => void
}

export default function ServiceManager({ showToast }: Props) {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { loadServices() }, [])

  const loadServices = async () => {
    try {
      const data = await getServices(false)
      setServices(data)
    } catch (err: any) {
      showToast(err.message, 'error')
    }
    setLoading(false)
  }

  const handleSave = async (formData: any) => {
    try {
      if (editingService?.id) {
        await updateService(editingService.id, formData)
        showToast('Service updated successfully!')
      } else {
        await createService(formData)
        showToast('Service created successfully!')
      }
      setShowForm(false)
      setEditingService(null)
      loadServices()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await deleteService(id)
      showToast('Service deleted')
      loadServices()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Manage Services</h3>
          <p className="text-sm text-gray-400">Add, edit, or remove services and update pricing</p>
        </div>
        <button
          onClick={() => { setEditingService(null); setShowForm(true) }}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </button>
      </div>

      {/* Service Cards */}
      <div className="grid gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {service.icon || '🐾'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-semibold">{service.title}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${service.active ? 'bg-green-500/15 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {service.features?.map((f: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded-lg">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-purple-400">₹{service.price_from}</div>
                <div className="text-xs text-gray-500">per {service.price_unit}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
              <button
                onClick={() => { setEditingService(service); setShowForm(true) }}
                className="px-3 py-1.5 text-sm text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <span className="text-4xl mb-4 block">🐾</span>
            <p>No services yet. Click "Add Service" to get started.</p>
          </div>
        )}
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingService(null) }}
        />
      )}
    </div>
  )
}

function ServiceForm({ service, onSave, onClose }: { service: any; onSave: (data: any) => void; onClose: () => void }) {
  const [title, setTitle] = useState(service?.title || '')
  const [description, setDescription] = useState(service?.description || '')
  const [icon, setIcon] = useState(service?.icon || '🐾')
  const [priceFrom, setPriceFrom] = useState<number>(service?.price_from || 0)
  const [priceUnit, setPriceUnit] = useState(service?.price_unit || 'day')
  const [features, setFeatures] = useState(service?.features?.join('\n') || '')
  const [active, setActive] = useState(service?.active !== false)
  const [sortOrder, setSortOrder] = useState<number>(service?.sort_order || 0)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave({
      title,
      description,
      icon,
      price_from: priceFrom,
      price_unit: priceUnit,
      features: features.split('\n').filter(f => f.trim()),
      active,
      sort_order: sortOrder,
    })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{service?.id ? 'Edit Service' : 'Add New Service'}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Name *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" placeholder="e.g. Pet Daycare" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description *</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none" placeholder="Describe this service..." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Icon</label>
              <input type="text" value={icon} onChange={e => setIcon(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Price (₹) *</label>
              <input type="number" value={priceFrom} onChange={e => setPriceFrom(Number(e.target.value))} required min={0}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Per</label>
              <select value={priceUnit} onChange={e => setPriceUnit(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="day">Day</option>
                <option value="night">Night</option>
                <option value="hour">Hour</option>
                <option value="session">Session</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Features (one per line)</label>
            <textarea value={features} onChange={e => setFeatures(e.target.value)} rows={4}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-sm" placeholder={"Daytime care\nRegular feeding\nSafe environment"} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Sort Order</label>
              <input type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)}
                  className="w-5 h-5 rounded-md border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500" />
                <span className="text-sm text-gray-300">Active (visible on website)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors text-sm font-medium">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</> : service?.id ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map(i => (
        <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-800 rounded w-32"></div>
              <div className="h-4 bg-gray-800 rounded w-64"></div>
              <div className="flex gap-2"><div className="h-6 bg-gray-800 rounded w-20"></div><div className="h-6 bg-gray-800 rounded w-24"></div></div>
            </div>
            <div className="text-right space-y-1"><div className="h-7 bg-gray-800 rounded w-16"></div><div className="h-3 bg-gray-800 rounded w-12"></div></div>
          </div>
        </div>
      ))}
    </div>
  )
}
