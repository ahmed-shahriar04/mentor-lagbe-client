/**
 * Challenge 3: Image Uploading System Using ImgBB API
 * Uploads direct image file to ImgBB and returns the live public image URL
 */
export async function uploadToImgBB(file) {
  if (!file) throw new Error('No file provided for upload');

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey || apiKey === 'your_imgbb_api_key_here') {
    // If user has not yet configured ImgBB API key, return a placeholder or warning
    console.warn('[ImgBB] Warning: NEXT_PUBLIC_IMGBB_API_KEY is not configured yet.');
  }

  const formData = new FormData();
  formData.append('image', file);

  const endpoint = `https://api.imgbb.com/1/upload?key=${apiKey || 'placeholder'}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (data.success && data.data?.url) {
    return data.data.url;
  }

  throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
}
