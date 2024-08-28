// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['firebasestorage.googleapis.com','loremflickr.com'], // Add your external domains here
    },
  };
  
  export default nextConfig;