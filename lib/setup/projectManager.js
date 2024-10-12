import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { executeCommand } from '../utils.js';
import { FileManager } from './fileManager.js';

export class ProjectManager {
    constructor(projectPath, framework, useTypescript) {
        this.projectPath = projectPath;
        this.framework = framework;
        this.useTypescript = useTypescript;
        this.__dirname = path.dirname(new URL(import.meta.url).pathname);
        this.__templateDir = path.join(this.__dirname, '../../templates');
        this.fileManager = new FileManager(projectPath, framework, useTypescript);
    }

    init() {
        this.initNodeProject();
        this.setupProjectStructure();
    }

    initNodeProject() {
        console.log(chalk.cyan('■  Initializing Node project...'));
        fs.mkdirSync(this.projectPath, { recursive: true });
        executeCommand('npm init -y', this.projectPath, { showOutput: false });
        console.log(chalk.green('✔  Node project initialized!'));
    }

    setupProjectStructure() {
        console.log(chalk.cyan('■  Creating project structure...'));

        fs.mkdirSync(`${this.projectPath}/src`, { recursive: true });

        this.fileManager.createPackageFile();
        this.fileManager.createBaseFiles();
        this.fileManager.createTemplateFiles();
        if (this.useTypescript) this.fileManager.createTsConfigFile();

        console.log(chalk.green('✔  Project structure created!'));
    }
}
