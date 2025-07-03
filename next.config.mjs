/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname:"professionalupdate.blob.core.windows.net",
                port:"",
            },
            {
                protocol: 'https',
                hostname:"lh3.googleusercontent.com",
                port:"",
            }
        ]
    }
};

export default nextConfig;
