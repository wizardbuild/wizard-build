import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { frameworkLibrary, ormLibrary } from '../dependencies/index.js';

export class FileManager {
    constructor(project) {
        this.project = project;
        this.__dirname = path.dirname(new URL(import.meta.url).pathname);
        this.__templateDir = path.join(this.__dirname, '../../templates');
    }

    init() {
        this.createPackageFile();

        console.log(chalk.cyan('■  Creating template files...'));

        this.createBaseFiles();

        if (this.project.useTypescript) {
            this.createTsConfigFile();
        }

        this.createFrameworkFiles();
        this.createOrmFiles();

        console.log(chalk.green('✔  Template files created!'));
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
        } catch (err) {
            console.error(chalk.red('⚠️  Failed to create base files.'));
        }
    }

    createTsConfigFile() {
        const tsconfigTemplatePath = path.join(this.__templateDir, 'config/tsconfig.json');

        try {
            const tsconfigContent = fs.readFileSync(tsconfigTemplatePath, 'utf-8');
            const tsconfigPath = path.join(this.project.path, 'tsconfig.json');
            fs.writeFileSync(tsconfigPath, tsconfigContent);
        } catch (err) {
            console.error(chalk.red('⚠️  Failed to create tsconfig.json from template.'));
        }
    }

    createTemplateFiles(templateList) {
        if (!Array.isArray(templateList)) {
            console.error(chalk.red('⚠️  Template list is undefined or not an array.'));
            return;
        }

        templateList.forEach(template => {
            try {
                const srcPath = path.join(this.__templateDir, template.src);
                const destPath = path.join(this.project.path, template.dest);
                const destDir = path.dirname(destPath);

                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }

                const content = fs.readFileSync(srcPath, 'utf-8');

                fs.writeFileSync(destPath, content);
            } catch (err) {
                console.error(chalk.red(`⚠️  Failed to create template file: ${template.dest}`));
            }
        });
    }

    createFrameworkFiles() {
        if (this.project.framework) {
            const frameworkKey = this.project.useTypescript ? `${this.project.framework.toLowerCase()}ts` : this.project.framework.toLowerCase();
            const frameworkConfig = frameworkLibrary[frameworkKey];
            if (frameworkConfig && frameworkConfig.templates) {
                this.createTemplateFiles(frameworkConfig.templates);
            }
        }
    }

    createOrmFiles() {
        if (this.project.orm) {
            const ormKey = this.project.useTypescript ? `${this.project.orm.toLowerCase()}ts` : this.project.orm.toLowerCase();
            const ormConfig = ormLibrary[ormKey];
            if (ormConfig && ormConfig.templates) {
                this.createTemplateFiles(ormConfig.templates);
            }
        }
    }

}
