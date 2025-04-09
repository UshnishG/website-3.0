const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  output: "standalone", // Ensures it works on Vercel
};

module.exports = nextConfig;
