import chalk from 'chalk';
import { executeCommand } from '../utils.js';
import { frameworkDependencies } from '../dependencies/frameworks.js';
import { ormDependencies } from '../dependencies/orms.js';
import { databaseDependencies } from '../dependencies/databases.js';

class DependencyManager {
    constructor(language, projectPath) {
        this.language = language;
        this.dependenciesList = [];
        this.devDependenciesList = [];
        this.useTypescript = language === 'TypeScript';
        this.projectPath = projectPath;

        if (this.useTypescript) {
            this.addDevDependencies(['typescript', 'ts-node', '@types/node']);
        }
    }

    addDevDependencies(devDependencies) {
        this.devDependenciesList.push(...devDependencies);
    }

    addDependencies(dependencies) {
        this.dependenciesList.push(...dependencies);
    }

    getDependencies(framework, database, orm) {
        this.getFrameworkDependencies(framework);
        this.getDatabaseDependencies(database);
        this.getOrmDependencies(orm);

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
        executeCommand(command, this.projectPath, { showOutput: false });
    }

    getDependenciesFromLibrary(key, library) {
        if (key == 'none') {
            return;
        }

        const libraryKey = this.useTypescript && library[`${key}ts`] ? `${key}ts` : key;
        const { dependencies = [], devDependencies = [] } = library[libraryKey] || {};

        if (dependencies.length || devDependencies.length) {
            this.addDependencies(dependencies);
            this.addDevDependencies(devDependencies);
        } else {
            console.warn(chalk.yellow(`⚠️  Unknown entry: "${key}".`));
        }
    }

    getFrameworkDependencies(framework) {
        const frameworkKey = framework.toLowerCase();
        this.getDependenciesFromLibrary(frameworkKey, frameworkDependencies);
    }

    getOrmDependencies(orm) {
        const ormKey = orm.toLowerCase();
        this.getDependenciesFromLibrary(ormKey, ormDependencies);
    }

    getDatabaseDependencies(database) {
        const databaseKey = database.toLowerCase();
        this.getDependenciesFromLibrary(databaseKey, databaseDependencies);
    }
}

export async function manageDependencies(language, framework, database, orm, projectPath) {
    const dependencyManager = new DependencyManager(language, projectPath);
    const { dependenciesList, devDependenciesList } = dependencyManager.getDependencies(framework, database, orm);
    await dependencyManager.installDependencies({ dependenciesList, devDependenciesList });
}
