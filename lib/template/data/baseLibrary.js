export const baseLibrary = {
    readme: {
        templates: [
            {
                src: 'base/README.md',
                dest: 'README.md'
            },
        ],
    },
    gitignore: {
        templates: [
            {
                src: 'base/.gitignore',
                dest: '.gitignore'
            },
        ],
    },
    env: {
        templates: [
            {
                src: 'base/.env.example',
                dest: '.env'
            },
        ],
    },
};
