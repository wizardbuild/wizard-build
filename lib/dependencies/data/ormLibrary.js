export const ormLibrary = {
    sequelize: {
        dependencies: ['sequelize'],
        devDependencies: [],
        templates: [
            {
                src: 'orm/sequelize/index.js',
                dest: 'src/db/index.js',
            },
            {
                src: 'orm/sequelize/spell.js',
                dest: 'src/models/spell.js',
            }
        ]
    },
    sequelizets: {
        dependencies: ['sequelize'],
        devDependencies: ['@types/sequelize'],
        templates: [
            {
                src: 'orm/sequelize/index.ts',
                dest: 'src/db/index.ts',
            },
            {
                src: 'orm/sequelize/spell.ts',
                dest: 'src/models/spell.ts',
            }
        ]
    },
    prisma: {
        dependencies: ['@prisma/client'],
        devDependencies: ['prisma'],
        templates: [
            {
                src: 'orm/prisma/schema.prisma',
                dest: 'prisma/schema.prisma',
            }
        ]
    },
    drizzle: {
        dependencies: ['drizzle-orm'],
        devDependencies: ['drizzle-kit'],
        templates: [
            {
                src: 'orm/drizzle/drizzle.config.js',
                dest: 'drizzle.config.js',
            },
            {
                src: 'orm/drizzle/index.js',
                dest: 'src/db/index.js',
            },
            {
                src: 'orm/drizzle/schema.js',
                dest: 'src/db/schema.js',
            }
        ]
    },
    drizzlets: {
        dependencies: ['drizzle-orm'],
        devDependencies: ['drizzle-kit', 'tsx'],
        templates: [
            {
                src: 'orm/drizzle/drizzle.config.ts',
                dest: 'drizzle.config.ts',
            },
            {
                src: 'orm/drizzle/index.ts',
                dest: 'src/db/index.ts',
            },
            {
                src: 'orm/drizzle/schema.ts',
                dest: 'src/db/schema.ts',
            }
        ]
    },
    typeorm: {
        dependencies: ['typeorm', 'reflect-metadata'],
        devDependencies: [],
        templates: [
            {
                src: 'orm/typeorm/data-source.js',
                dest: 'src/data-source.js',
            },
            {
                src: 'orm/typeorm/spell.js',
                dest: 'src/models/spell.js',
            }
        ]
    },
    typeormts: {
        dependencies: ['typeorm', 'reflect-metadata'],
        devDependencies: [],
        templates: [
            {
                src: 'orm/typeorm/data-source.ts',
                dest: 'src/data-source.ts',
            },
            {
                src: 'orm/typeorm/spell.ts',
                dest: 'src/models/spell.ts',
            }
        ]
    },
};
