export const testLibrary = {
    jest: {
        dependencies: [],
        devDependencies: ['jest'],
        templates: [
            {
                src: 'test/jest/test.js',
                dest: 'test/test.js',
            },
        ]
    },
    jasmine: {
        dependencies: [],
        devDependencies: ['jasmine'],
        templates: [
            {
                src: 'test/jasmine/jasmine.json',
                dest: 'spec/support/jasmine.json',
            },
            {
                src: 'test/jasmine/test.js',
                dest: 'test/test.js',
            }
        ]
    },
    mocha: {
        dependencies: [],
        devDependencies: ['mocha', 'chai'],
        templates: [
            {
                src: 'test/mocha/test.js',
                dest: 'test/test.js',
            },
        ]
    },
};
