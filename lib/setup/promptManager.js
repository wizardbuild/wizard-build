import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';

export class PromptManager {
    constructor() {
        this.choices = {};
    }

    async promptUser() {
        await this.getDirectory();
        await this.getLanguage();
        await this.getFramework();
        await this.getDatabase();
        await this.getOrm();
        await this.getInitGit();

        console.log('\n' + chalk.green('✔️  All preparations complete! The quest shall proceed!'));
        return this.choices;
    }

    async getProjectSetup() {
        let choices = await this.promptUser();

        return {
            directory: choices.directory,
            path: path.join(process.cwd(), choices.directory),
            language: choices.language,
            framework: choices.framework,
            database: choices.database,
            orm: choices.orm,
            initGit: choices.initGit,
            useTypescript: choices.language === 'TypeScript',
        }
    }

    async getDirectory() {
        const { directory } = await inquirer.prompt({
            type: 'input',
            name: 'directory',
            message: chalk.bold('🏰  ') + `Where shall we forge your new stronghold?`,
            default: './project',
        });
        this.choices.directory = directory;
    }

    async getLanguage() {
        const { language } = await inquirer.prompt({
            type: 'list',
            name: 'language',
            message: chalk.bold('📜  ') + `Choose the language for your spellbook:`,
            choices: ['TypeScript', 'JavaScript'],
        });
        this.choices.language = language;
    }

    async getLint() {
        const { lint } = await inquirer.prompt({
            type: 'list',
            name: 'lint',
            message: chalk.bold('🧹  ') + `Shall we use a linter to keep your code clean?`,
            choices: ['None', 'ESLint', 'Biome'],
        });
        this.choices.lint = lint;
    }

    async getFramework() {
        const { framework } = await inquirer.prompt({
            type: 'list',
            name: 'framework',
            message: chalk.bold('🛡️  ') + `Select the framework to guard your backend:`,
            choices: ['None', 'Express', 'Fastify', 'Koa'],
        });
        this.choices.framework = framework;
    }

    async getDatabase() {
        const { database } = await inquirer.prompt({
            type: 'list',
            name: 'database',
            message: chalk.bold('📖  ') + `Which database shall store your treasures?`,
            choices: ['None', 'MariaDB', 'MySQL', 'PostgreSQL', 'MongoDB'],
        });
        this.choices.database = database;
    }

    async getOrm() {
        const { orm } = await inquirer.prompt({
            type: 'list',
            name: 'orm',
            message: chalk.bold('🔮  ') + `Which ORM shall guide your data?`,
            choices: ['None', 'Sequelize', 'Prisma', 'TypeORM', 'Drizzle'],
        });
        this.choices.orm = orm;
    }

    async getInitGit() {
        const { initGit } = await inquirer.prompt({
            type: 'confirm',
            name: 'initGit',
            message: chalk.bold('🗝️  ') + `Shall we initiate a new Git repository?`,
            default: true,
        });
        this.choices.initGit = initGit;
    }
}
