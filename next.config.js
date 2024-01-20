/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    assetPrefix: isProd ? 'https://ae.arrive.waysdatalabs.com/docs' : undefined,
}

module.exports = nextConfig
