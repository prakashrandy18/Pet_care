const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'dx1fuvdry'

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
export const CLOUDINARY_UPLOAD_PRESET = 'pspetcare_unsigned'

export function getCloudinaryUrl(publicId: string, options: {
  width?: number
  height?: number
  crop?: string
  quality?: string
  format?: string
} = {}) {
  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options
  const transforms: string[] = []
  
  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if (crop) transforms.push(`c_${crop}`)
  transforms.push(`q_${quality}`)
  transforms.push(`f_${format}`)

  const transformStr = transforms.join(',')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`
}

export async function uploadToCloudinary(file: File, folder: string = 'gallery'): Promise<{
  url: string
  publicId: string
  thumbnailUrl: string
}> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('folder', `pspetcare/${folder}`)

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'Upload failed')
  }

  const data = await response.json()
  
  return {
    url: data.secure_url,
    publicId: data.public_id,
    thumbnailUrl: getCloudinaryUrl(data.public_id, { width: 300, height: 300, crop: 'fill' }),
  }
}
