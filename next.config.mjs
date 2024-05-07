/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.imgur.com'],
    },
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};



export default nextConfig;