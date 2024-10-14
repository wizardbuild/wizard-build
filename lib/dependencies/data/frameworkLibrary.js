export const frameworkLibrary = {
    express: {
        dependencies: ['express'],
        devDependencies: [],
        templates: [
            {
                src: 'framework/express/index.js',
                dest: 'src/index.js',
            }
        ]
    },
    expressts: {
        dependencies: ['express'],
        devDependencies: ['@types/express'],
        templates: [
            {
                src: 'framework/express/index.ts',
                dest: 'src/index.ts',
            }
        ]
    },
    fastify: {
        dependencies: ['fastify'],
        devDependencies: [],
        templates: [
            {
                src: 'framework/fastify/index.js',
                dest: 'src/index.js',
            }
        ]
    },
    fastifyts: {
        dependencies: ['fastify'],
        devDependencies: [],
        templates: [
            {
                src: 'framework/fastify/index.ts',
                dest: 'src/index.ts',
            }
        ]
    },
    koa: {
        dependencies: ['koa', 'koa-router'],
        devDependencies: [],
        templates: [
            {
                src: 'framework/koa/index.js',
                dest: 'src/index.js',
            }
        ]
    },
    koats: {
        dependencies: ['koa', 'koa-router'],
        devDependencies: [],
        templates: [
            {
                src: 'framework/koa/index.ts',
                dest: 'src/index.ts',
            }
        ]
    },
};
