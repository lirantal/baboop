import { defineConfig } from 'tsup';

export default defineConfig([
    {
        entryPoints: ['src/**/*.ts'],
        format: ['cjs', 'esm'],
        dts: true,
        minify: false,
        outDir: 'dist/',
        clean: true,
        sourcemap: false,
        bundle: false,
        splitting: false,
        outExtension(ctx) {
		    return { 
                dts: '.d.ts',
                js: ctx.format === 'cjs' ? '.cjs' : '.mjs'
            };
		},
        treeshake: false,
        target: 'es2022',
        platform: 'node',
        tsconfig: './tsconfig.json',
        cjsInterop: true,
        keepNames: true,
        skipNodeModulesBundle: false,
    },
    
]);