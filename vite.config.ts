import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';
    const base = isProduction ? '/pawin-demo/' : '/';
    
    // Set the base URL for production
    process.env.VITE_BASE_URL = base;
    
    return {
        base,
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.BASE_URL': JSON.stringify(base)
        },
        plugins: [
            ViteImageOptimizer({
                png: { quality: 80 },
                jpg: { quality: 80 },
                webp: { lossless: false },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~': path.resolve(__dirname, './public')
            }
        },
        server: {
            port: 3000,
            open: true
        },
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            assetsInlineLimit: 4096, // 4kb
            rollupOptions: {
                output: {
                    assetFileNames: 'assets/[name]-[hash][extname]',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    entryFileNames: 'assets/[name]-[hash].js',
                },
            },
        },
    };
});
