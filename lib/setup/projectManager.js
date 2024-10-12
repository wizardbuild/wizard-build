import fs from 'fs';
import chalk from 'chalk';
import { executeCommand } from '../utils.js';
import { FileManager } from './fileManager.js';

export class ProjectManager {
    constructor(project) {
        this.project = project;
        this.fileManager = new FileManager(this.project);
    }

    init() {
        this.initNodeProject();
        this.setupProjectStructure();
    }

    initNodeProject() {
        console.log(chalk.cyan('■  Initializing Node project...'));
        fs.mkdirSync(this.project.path, { recursive: true });
        executeCommand('npm init -y', this.project.path, { showOutput: false });
        console.log(chalk.green('✔  Node project initialized!'));
    }

    setupProjectStructure() {
        console.log(chalk.cyan('■  Creating project structure...'));

        fs.mkdirSync(`${this.project.path}/src`, { recursive: true });

        this.fileManager.createPackageFile();
        this.fileManager.createBaseFiles();
        this.fileManager.createTemplateFiles();
        if (this.project.useTypescript) this.fileManager.createTsConfigFile();

        console.log(chalk.green('✔  Project structure created!'));
    }
}
