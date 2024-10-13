import chalk from 'chalk';
import { executeCommand } from '../utils.js';
import { frameworkLibrary, databaseLibrary, ormLibrary } from './index.js';

export class DependencyManager {
    constructor(project) {
        this.project = project;
        this.dependenciesList = ['dotenv'];
        this.devDependenciesList = [];

        if (this.project.useTypescript) {
            this.addDevDependencies(['typescript', '@types/node', 'tsx']);
        }
    }

    init() {
        this.getDependencies();
        this.installDependencies();
    }

    addDevDependencies(devDependencies) {
        this.devDependenciesList.push(...devDependencies);
    }

    addDependencies(dependencies) {
        this.dependenciesList.push(...dependencies);
    }

    getDependencies() {
        this.getFrameworkDependencies();
        this.getOrmDependencies();
        this.getDatabaseDependencies();

        return {
            dependenciesList: this.dependenciesList,
            devDependenciesList: this.devDependenciesList,
        };
    }

    installDependencies() {
        console.log(chalk.cyan('■  Adding dependencies...'));

        if (!this.dependenciesList.length && !this.devDependenciesList.length) {
            console.log(chalk.yellow('No dependencies to install.'));
            return;
        }

        this.install(this.dependenciesList);
        this.install(this.devDependenciesList, true);

        console.log(chalk.green('✔  All dependencies added to package.json!'));
    }

    install(deps, isDev = false) {
        const commandPrefix = isDev ? 'npm install -D' : 'npm install';
        const command = `${commandPrefix} --package-lock-only --no-package-lock ${deps.join(' ')}`;
        executeCommand(command, this.project.path, { showOutput: false });
    }

    getDependenciesFromLibrary(key, library) {
        if (key == 'none') {
            return;
        }

        const libraryKey = this.project.useTypescript && library[`${key}ts`] ? `${key}ts` : key;
        const { dependencies = [], devDependencies = [] } = library[libraryKey] || {};

        if (dependencies.length || devDependencies.length) {
            this.addDependencies(dependencies);
            this.addDevDependencies(devDependencies);
        } else {
            console.warn(chalk.yellow(`⚠️  Unknown entry: "${key}".`));
        }
    }

    getFrameworkDependencies() {
        const frameworkKey = this.project.framework.toLowerCase();
        this.getDependenciesFromLibrary(frameworkKey, frameworkLibrary);
    }

    getOrmDependencies() {
        const ormKey = this.project.orm.toLowerCase();
        this.getDependenciesFromLibrary(ormKey, ormLibrary);
    }

    getDatabaseDependencies() {
        const databaseKey = this.project.database.toLowerCase();
        this.getDependenciesFromLibrary(databaseKey, databaseLibrary);
    }
}

