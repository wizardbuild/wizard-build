export const lintLibrary = {
    eslint: {
        dependencies: [],
        devDependencies: ['eslint', '@eslint/js', 'prettier'],
        templates: [
            {
                src: 'lint/eslint/eslint.config.js',
                dest: 'eslint.config.js',
            },
        ]
    },
    biome: {
        dependencies: [],
        devDependencies: ['@biomejs/biome'],
        templates: [
            {
                src: 'lint/biome/biome.json',
                dest: 'biome.json',
            },
        ]
    },
};
