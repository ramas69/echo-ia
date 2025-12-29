/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver la détection automatique d'hôte pour éviter les erreurs réseau
  env: {
    HOSTNAME: 'localhost',
  },
};

export default nextConfig;

