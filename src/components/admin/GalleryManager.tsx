import React, { useState, useEffect, useRef } from 'react'
import { getGalleryImages, createGalleryImage, deleteGalleryImage } from '../../lib/supabase'
import { uploadToCloudinary } from '../../lib/cloudinary'

interface Props {
  showToast: (msg: string, type?: 'success' | 'error') => void
}

const CATEGORIES = ['general', 'dogs', 'cats', 'birds', 'facility', 'events']

export default function GalleryManager({ showToast }: Props) {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  const load = async () => {
    try { setImages(await getGalleryImages(false)) } catch (err: any) { showToast(err.message, 'error') }
    setLoading(false)
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('image/')) { showToast(`${file.name} is not an image`, 'error'); continue }
      if (file.size > 10 * 1024 * 1024) { showToast(`${file.name} is too large (max 10 MB)`, 'error'); continue }

      setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}`)
      try {
        const result = await uploadToCloudinary(file, 'gallery')
        await createGalleryImage({
          image_url: result.url,
          thumbnail_url: result.thumbnailUrl,
          cloudinary_public_id: result.publicId,
          caption: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
          category: 'general',
        })
      } catch (err: any) {
        showToast(`Failed to upload ${file.name}: ${err.message}`, 'error')
      }
    }

    setUploading(false)
    setUploadProgress('')
    showToast(`${files.length} image(s) uploaded successfully!`)
    load()
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try { await deleteGalleryImage(id); showToast('Image deleted'); load() } catch (err: any) { showToast(err.message, 'error') }
  }

  const filtered = selectedCategory === 'all' ? images : images.filter(img => img.category === selectedCategory)

  if (loading) return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[1,2,3,4,5,6,7,8].map(i => <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl aspect-square animate-pulse"></div>)}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Gallery Manager</h3>
          <p className="text-sm text-gray-400">Upload and manage pet photos ({images.length} images)</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files)} />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
            {uploading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> {uploadProgress}</>
            ) : (
              <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Upload Photos</>
            )}
          </button>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-700 hover:border-purple-500/50 rounded-2xl p-8 text-center transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-purple-500', 'bg-purple-500/5') }}
        onDragLeave={e => { e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/5') }}
        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/5'); handleUpload(e.dataTransfer.files) }}
      >
        <span className="text-4xl mb-3 block">📸</span>
        <p className="text-gray-400 mb-1">Drag & drop images here, or click to browse</p>
        <p className="text-xs text-gray-600">Supports JPG, PNG, WebP • Max 10 MB per image</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedCategory === 'all' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
          All ({images.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = images.filter(img => img.category === cat).length
          return (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors capitalize ${selectedCategory === cat ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(img => (
          <div key={img.id} className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden aspect-square">
            <img src={img.thumbnail_url || img.image_url} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <p className="text-xs text-gray-300 text-center px-2 truncate w-full">{img.caption}</p>
              <button onClick={() => handleDelete(img.id)}
                className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded-lg transition-colors">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <span className="text-4xl mb-4 block">📸</span>
          <p>No images yet. Upload some photos above!</p>
        </div>
      )}
    </div>
  )
}
