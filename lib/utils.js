import { execSync } from 'child_process';
import chalk from 'chalk';

export function executeCommand(command, projectPath, options = { showOutput: true }) {
    try {
        const execOptions = { cwd: projectPath, stdio: options.showOutput ? 'inherit' : 'pipe' };

        if (process.platform === 'win32' || process.platform === 'win64') {
            execOptions.shell = 'cmd.exe';
        } else {
            execOptions.shell = '/bin/sh';
        }

        execSync(command, execOptions);
    } catch (error) {
        console.error(chalk.red(`✖ Error executing command: ${command}`));
        console.error(chalk.red(`✖ Failed in directory: ${projectPath}`));
        console.error(chalk.red(error.message));
        process.exit(1);
    }
}
