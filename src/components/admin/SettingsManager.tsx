import React, { useState, useEffect } from 'react'
import { getSiteSettings, updateSiteSettings } from '../../lib/supabase'

interface Props {
  showToast: (msg: string, type?: 'success' | 'error') => void
}

export default function SettingsManager({ showToast }: Props) {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form fields
  const [siteName, setSiteName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [weekdayHours, setWeekdayHours] = useState('')
  const [saturdayHours, setSaturdayHours] = useState('')
  const [sundayHours, setSundayHours] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      const data = await getSiteSettings()
      if (data) {
        setSettings(data)
        setSiteName(data.site_name || '')
        setPhone(data.phone || '')
        setWhatsapp(data.whatsapp || '')
        setEmail(data.email || '')
        setStreet(data.street || '')
        setCity(data.city || '')
        setState(data.state || '')
        setZip(data.zip || '')
        setWeekdayHours(data.weekday_hours || '')
        setSaturdayHours(data.saturday_hours || '')
        setSundayHours(data.sunday_hours || '')
        setInstagramUrl(data.instagram_url || '')
        setFacebookUrl(data.facebook_url || '')
        setAnnouncement(data.announcement || '')
      }
    } catch (err: any) { showToast(err.message, 'error') }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSiteSettings({
        site_name: siteName, phone, whatsapp, email,
        street, city, state, zip,
        weekday_hours: weekdayHours, saturday_hours: saturdayHours, sunday_hours: sundayHours,
        instagram_url: instagramUrl, facebook_url: facebookUrl,
        announcement,
      })
      showToast('Settings saved successfully!')
    } catch (err: any) { showToast(err.message, 'error') }
    setSaving(false)
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-32"></div>)}</div>

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-white">Business Settings</h3>
        <p className="text-sm text-gray-400">Update your business information displayed on the website</p>
      </div>

      {/* Business Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2">🏢 Business Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Business Name</label>
            <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">WhatsApp Number</label>
            <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. 919962203484" /></div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2">📍 Address</h4>
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Street Address</label>
          <input type="text" value={street} onChange={e => setStreet(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">State</label>
            <input type="text" value={state} onChange={e => setState(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">ZIP Code</label>
            <input type="text" value={zip} onChange={e => setZip(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2">🕒 Business Hours</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Mon–Fri</label>
            <input type="text" value={weekdayHours} onChange={e => setWeekdayHours(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="7:00 AM - 8:00 PM" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Saturday</label>
            <input type="text" value={saturdayHours} onChange={e => setSaturdayHours(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="8:00 AM - 6:00 PM" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Sunday</label>
            <input type="text" value={sundayHours} onChange={e => setSundayHours(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="9:00 AM - 5:00 PM" /></div>
        </div>
      </div>

      {/* Social & Announcement */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2">📱 Social & Announcements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Instagram URL</label>
            <input type="url" value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Facebook URL</label>
            <input type="url" value={facebookUrl} onChange={e => setFacebookUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Announcement Banner <span className="text-gray-500">(leave empty to hide)</span></label>
          <input type="text" value={announcement} onChange={e => setAnnouncement(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. 🎉 20% off boarding this week!" /></div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button type="submit" disabled={saving}
          className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-purple-500/20">
          {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</> : '💾 Save Settings'}
        </button>
      </div>
    </form>
  )
}
