import { validateError } from '@/utils/validate'
import { useState } from 'react'

const useCloudinaryUpload = () => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]

    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL

    if (!uploadPreset || !cloudinaryUrl) {
      setError('Cloudinary configuration missing.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    setIsUploading(true)
    setError(null)

    try {
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      return data.secure_url
    } catch (err) {
      console.log({ err })
      setError(validateError(err))
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadFile,
    uploadedFileUrl,
    isUploading,
    error,
    setUploadedFileUrl,
  }
}

export default useCloudinaryUpload
