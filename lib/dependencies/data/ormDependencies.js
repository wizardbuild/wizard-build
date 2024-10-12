export const ormDependencies = {
    sequelize: {
        dependencies: ['sequelize'],
        devDependencies: [],
    },
    prisma: {
        dependencies: ['@prisma/client'],
        devDependencies: ['prisma'],
    },
    drizzle: {
        dependencies: ['drizzle-orm', 'dotenv'],
        devDependencies: ['drizzle-kit'],
    },
    drizzlets: {
        dependencies: ['drizzle-orm', 'dotenv'],
        devDependencies: ['drizzle-kit', 'tsx'],
    },
    typeorm: {
        dependencies: ['typeorm', 'reflect-metadata'],
        devDependencies: [],
    },
};
