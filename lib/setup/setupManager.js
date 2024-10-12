import chalk from 'chalk';
import { ProjectManager } from './projectManager.js';
import { DependencyManager } from '../dependencies/dependencyManager.js';
import { GitManager } from './gitManager.js';

export class SetupManager {
    constructor(project) {
        this.project = project;
        this.projectManager = new ProjectManager(project);
        this.dependencyMagager = new DependencyManager(project);
        this.gitManager = new GitManager(project.path);
    }

    async setupProject() {
        try {
            this.projectManager.init();
            this.dependencyMagager.init();

            if (this.initGit) {
                this.gitManager.init();
            }

            console.log(chalk.green('✔  Project setup complete!'));
        } catch (error) {
            console.error(chalk.red('⚠️  An error occurred during the setup process.'));
            console.error(error);
        }
    }
}
