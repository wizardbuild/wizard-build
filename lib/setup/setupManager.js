import fs from 'fs';
import chalk from 'chalk';
import { executeCommand } from '../utils.js';
import { FileManager } from '../file/fileManager.js';
import { DependencyManager } from '../dependencies/dependencyManager.js';
import { GitManager } from '../git/gitManager.js';

export class SetupManager {
    constructor(project) {
        this.project = project;
        this.fileManager = new FileManager(project);
        this.dependencyMagager = new DependencyManager(project);
        this.gitManager = new GitManager(project.path);
    }

    createNodeProject() {
        console.log(chalk.cyan('■  Initializing Node project...'));
        fs.mkdirSync(this.project.path, { recursive: true });
        executeCommand('npm init -y', this.project.path, { showOutput: false });
        console.log(chalk.green('✔  Node project initialized!'));
    }

    async init() {
        try {
            this.createNodeProject();
            this.fileManager.init();
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
