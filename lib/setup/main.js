import path from 'path';
import chalk from 'chalk';
import { ProjectManager } from './projectManager.js';
import { manageDependencies } from './dependencyManager.js';
import { initGitRepository } from '../git/gitInitializer.js';

export async function setup(directory, language, framework, database, orm, initGit) {
    const projectPath = path.join(process.cwd(), directory);
    const useTypescript = language === 'TypeScript';

    try {
        // Initialize project
        const projectManager = new ProjectManager(projectPath, framework, useTypescript);
        projectManager.init();

        // Manage dependencies
        await manageDependencies(language, framework, database, orm, projectPath);

        // Init Git
        if (initGit) {
            initGitRepository(projectPath);
        }

        console.log(chalk.green('✔  Project setup complete!'));
    } catch (error) {
        console.error(chalk.red('⚠️  An error occurred during the setup process.'));
        console.error(error);
    }
}
