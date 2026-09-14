import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sakuhukum.ulm.ac.id' // Optional fallback

  const routes = [
    '',
    '/tentang',
    '/kurikulum',
    '/fasilitas',
    '/dosen',
    '/kemahasiswaan',
    '/perspektif',
    '/karier',
    '/tautan',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
