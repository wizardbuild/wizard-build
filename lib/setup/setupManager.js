import path from 'path';
import chalk from 'chalk';
import { ProjectManager } from './projectManager.js';
import { manageDependencies } from '../dependencies/dependencyManager.js';
import { GitManager } from '../git/gitManager.js';

export class SetupManager {
    constructor(directory, language, framework, database, orm, initGit) {
        this.directory = directory;
        this.language = language;
        this.framework = framework;
        this.database = database;
        this.orm = orm;
        this.initGit = initGit;
        this.projectPath = path.join(process.cwd(), directory);
        this.useTypescript = language === 'TypeScript';
    }

    initProject() {
        const projectManager = new ProjectManager(this.projectPath, this.framework, this.useTypescript);
        projectManager.init();
    }

    async manageDependencies() {
        await manageDependencies(this.language, this.framework, this.database, this.orm, this.projectPath);
    }

    initGitRepository() {
        const gitManager = new GitManager(this.projectPath);
        gitManager.initGitRepository();
    }

    async setupProject() {
        try {
            this.initProject();
            await this.manageDependencies();

            if (this.initGit) {
                this.initGitRepository();
            }

            console.log(chalk.green('✔  Project setup complete!'));
        } catch (error) {
            console.error(chalk.red('⚠️  An error occurred during the setup process.'));
            console.error(error);
        }
    }
}