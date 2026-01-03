/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver la détection automatique d'hôte pour éviter les erreurs réseau
  env: {
    HOSTNAME: 'localhost',
  },
  
  // Headers de sécurité HTTP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Protège contre le clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Empêche le sniffing MIME
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Protection XSS pour anciens navigateurs
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Limite les infos de référence
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Désactive les permissions sensibles
          },
        ],
      },
    ];
  },
};

export default nextConfig;

