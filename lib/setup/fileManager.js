import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export class FileManager {
    constructor(project) {
        this.project = project;
        this.__dirname = path.dirname(new URL(import.meta.url).pathname);
        this.__templateDir = path.join(this.__dirname, '../../templates');
    }

    createPackageFile() {
        console.log(chalk.cyan('■  Setup Package.json...'));

        const packageJsonPath = path.join(this.project.path, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        packageJson.description = "Backend project generated with Backend CLI";
        packageJson.main = `src/${this.project.useTypescript ? 'index.ts' : 'index.js'}`;
        packageJson.license = "MIT";

        if (this.project.useTypescript) {
            packageJson.scripts = {
                start: `node dist/index.js`,
                dev: `tsx watch src/index.ts`,
                build: "tsc",
                watch: "tsc -w",
            };
        } else {
            packageJson.scripts = {
                start: `node dist/index.js`,
                dev: `node src/index.js`,
            };
        }

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(chalk.green('✔  package.json set up successfully!'));
    }

    createBaseFiles() {
        try {
            const files = [
                { path: 'README.md', content: fs.readFileSync(path.join(this.__templateDir, 'base/', 'README.md'), 'utf-8') },
                { path: '.gitignore', content: fs.readFileSync(path.join(this.__templateDir, 'base/', '.gitignore'), 'utf-8') },
                { path: '.env', content: fs.readFileSync(path.join(this.__templateDir, 'base/', '.env.example'), 'utf-8') },
            ];

            files.forEach(file => fs.writeFileSync(path.join(this.project.path, file.path), file.content));
            console.log(chalk.green('✔  Base files created successfully!'));
        } catch (err) {
            console.error(chalk.red('⚠️  Failed to create base files.'));
            console.error(err);
        }
    }

    createTemplateFiles() {
        const entryFileName = this.project.useTypescript ? 'index.ts' : 'index.js';
        let entryFileContent = '// Entry file';

        if (this.project.framework.toLowerCase() != 'none') {
            const templateFilePath = path.join(
                this.__templateDir,
                `frameworks/${this.project.framework.toLowerCase()}.${this.project.useTypescript ? 'ts' : 'js'}`
            );

            try {
                entryFileContent = fs.readFileSync(templateFilePath, 'utf-8');
            } catch {
                console.warn(chalk.yellow(`⚠️  Template file not found for "${this.project.framework}". Using default entry file content.`));
            }
        }

        fs.writeFileSync(path.join(this.project.path, 'src', entryFileName), entryFileContent);
        console.log(chalk.green(`✔  ${entryFileName} created successfully!`));
    }

    createTsConfigFile() {
        const tsconfigTemplatePath = path.join(this.__templateDir, 'config/tsconfig.json');

        try {
            const tsconfigContent = fs.readFileSync(tsconfigTemplatePath, 'utf-8');
            const tsconfigPath = path.join(this.project.path, 'tsconfig.json');
            fs.writeFileSync(tsconfigPath, tsconfigContent);
            console.log(chalk.green('✔ tsconfig.json created successfully from template!'));
        } catch (err) {
            console.error(chalk.red('⚠️  Failed to create tsconfig.json from template.'));
            console.error(err);
        }
    }
}
