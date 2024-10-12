import inquirer from 'inquirer';
import chalk from 'chalk';

class PromptManager {
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

export async function getUserChoices() {
    const promptManager = new PromptManager();
    return await promptManager.promptUser();
}
