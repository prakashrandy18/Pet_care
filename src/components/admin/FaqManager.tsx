import React, { useState, useEffect } from 'react'
import { getFaqItems, createFaqItem, updateFaqItem, deleteFaqItem } from '../../lib/supabase'

interface Props {
  showToast: (msg: string, type?: 'success' | 'error') => void
}

export default function FaqManager({ showToast }: Props) {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { load() }, [])

  const load = async () => {
    try { setFaqs(await getFaqItems(false)) } catch (err: any) { showToast(err.message, 'error') }
    setLoading(false)
  }

  const handleSave = async (data: any) => {
    try {
      if (editing?.id) { await updateFaqItem(editing.id, data); showToast('FAQ updated!') }
      else { await createFaqItem(data); showToast('FAQ added!') }
      setShowForm(false); setEditing(null); load()
    } catch (err: any) { showToast(err.message, 'error') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    try { await deleteFaqItem(id); showToast('FAQ deleted'); load() } catch (err: any) { showToast(err.message, 'error') }
  }

  if (loading) return <div className="animate-pulse space-y-3">{[1,2,3].map(i => <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-24"></div>)}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Manage FAQs</h3>
          <p className="text-sm text-gray-400">Add or edit frequently asked questions</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-sm text-blue-400 font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">{faq.question}</h4>
                <p className="text-sm text-gray-400">{faq.answer}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${faq.active ? 'bg-green-500/15 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                {faq.active ? 'Active' : 'Hidden'}
              </span>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800">
              <button onClick={() => { setEditing(faq); setShowForm(true) }} className="px-3 py-1.5 text-sm text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors">✏️ Edit</button>
              <button onClick={() => handleDelete(faq.id)} className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">🗑️ Delete</button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <div className="text-center py-12 text-gray-500"><span className="text-4xl mb-4 block">❓</span><p>No FAQs yet.</p></div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditing(null) }}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{editing?.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="p-1 text-gray-400 hover:text-white">✕</button>
            </div>
            <FaqForm faq={editing} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  )
}

function FaqForm({ faq, onSave }: { faq: any; onSave: (data: any) => void }) {
  const [question, setQuestion] = useState(faq?.question || '')
  const [answer, setAnswer] = useState(faq?.answer || '')
  const [active, setActive] = useState(faq?.active !== false)
  const [sortOrder, setSortOrder] = useState<number>(faq?.sort_order || 0)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    await onSave({ question, answer, active, sort_order: sortOrder })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Question *</label>
        <input type="text" value={question} onChange={e => setQuestion(e.target.value)} required
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. What are your operating hours?" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Answer *</label>
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} required rows={4}
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Sort Order</label>
          <input type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="w-5 h-5 rounded-md border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500" />
            <span className="text-sm text-gray-300">Visible on site</span>
          </label>
        </div>
      </div>
      <button type="submit" disabled={saving} className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
        {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</> : 'Save FAQ'}
      </button>
    </form>
  )
}
