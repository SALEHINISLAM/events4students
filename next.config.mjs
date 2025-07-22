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
            },
            {
                protocol: 'https',
                hostname:"scontent.fdac99-1.fna.fbcdn.net",
                port:"",
            },
            {
                protocol: 'https',
                hostname:"via.placeholder.com",
                port:"",
            },
            {
                protocol: 'https',
                hostname:"drive.google.com",
                port:"",
            },
            {
                protocol: 'http',
                hostname:"i.postimg.cc",
                port:"",
            }
        ]
    }
};

export default nextConfig;
