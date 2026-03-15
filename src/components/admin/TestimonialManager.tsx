import React, { useState, useEffect } from 'react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../lib/supabase'

interface Props {
  showToast: (msg: string, type?: 'success' | 'error') => void
}

export default function TestimonialManager({ showToast }: Props) {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { load() }, [])

  const load = async () => {
    try { setTestimonials(await getTestimonials(false)) } catch (err: any) { showToast(err.message, 'error') }
    setLoading(false)
  }

  const handleSave = async (data: any) => {
    try {
      if (editing?.id) { await updateTestimonial(editing.id, data); showToast('Testimonial updated!') }
      else { await createTestimonial(data); showToast('Testimonial added!') }
      setShowForm(false); setEditing(null); load()
    } catch (err: any) { showToast(err.message, 'error') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try { await deleteTestimonial(id); showToast('Testimonial deleted'); load() } catch (err: any) { showToast(err.message, 'error') }
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-32"></div>)}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Manage Testimonials</h3>
          <p className="text-sm text-gray-400">Add customer reviews to display on the website</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Testimonial
        </button>
      </div>

      <div className="grid gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-xl flex-shrink-0">⭐</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold">{t.author}</h4>
                  <span className="text-xs text-gray-500">• {t.pet_name} ({t.pet_type})</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ml-auto ${t.active ? 'bg-green-500/15 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                    {t.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-2">{Array(t.rating).fill(0).map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
                <p className="text-sm text-gray-400 italic">"{t.text}"</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
              <button onClick={() => { setEditing(t); setShowForm(true) }} className="px-3 py-1.5 text-sm text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors">✏️ Edit</button>
              <button onClick={() => handleDelete(t.id)} className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">🗑️ Delete</button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <div className="text-center py-12 text-gray-500"><span className="text-4xl mb-4 block">⭐</span><p>No testimonials yet.</p></div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditing(null) }}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{editing?.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="p-1 text-gray-400 hover:text-white">✕</button>
            </div>
            <TestimonialForm testimonial={editing} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  )
}

function TestimonialForm({ testimonial, onSave }: { testimonial: any; onSave: (data: any) => void }) {
  const [author, setAuthor] = useState(testimonial?.author || '')
  const [petName, setPetName] = useState(testimonial?.pet_name || '')
  const [petType, setPetType] = useState(testimonial?.pet_type || '')
  const [rating, setRating] = useState(testimonial?.rating || 5)
  const [text, setText] = useState(testimonial?.text || '')
  const [active, setActive] = useState(testimonial?.active !== false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    await onSave({ author, pet_name: petName, pet_type: petType, rating, text, active })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Customer Name *</label>
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Rating</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none">
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{'★'.repeat(r)} ({r})</option>)}
          </select></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Pet Name *</label>
          <input type="text" value={petName} onChange={e => setPetName(e.target.value)} required className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Pet Type *</label>
          <input type="text" value={petType} onChange={e => setPetType(e.target.value)} required className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. Labrador" /></div>
      </div>
      <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Review Text *</label>
        <textarea value={text} onChange={e => setText(e.target.value)} required rows={4} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none" /></div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="w-5 h-5 rounded-md border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500" />
        <span className="text-sm text-gray-300">Visible on website</span>
      </label>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
          {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</> : 'Save Testimonial'}
        </button>
      </div>
    </form>
  )
}
