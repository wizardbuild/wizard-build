#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import { setup } from './lib/setup/main.js';
import { getUserChoices } from './lib/setup/promptManager.js';
import {
    getRandomIntroMessage,
    getRandomCelebrationMessage,
    getRandomInstructionMessage,
    getRandomFinalMessage
} from './lib/stories/main.js';

async function initProject() {
    // Intro message
    getRandomIntroMessage();
    console.log('\n');

    // Gather the user's choices for the project setup
    const { directory, language, framework, database, orm, installDeps, initGit } = await getUserChoices();
    await setup(directory, language, framework, database, orm, installDeps, initGit);
    console.log('\n');

    // Celebratory message
    getRandomCelebrationMessage();
    console.log('\n');

    // Final instructions
    getRandomInstructionMessage(directory);
    console.log('\n');

    // Offer guidance for help
    console.log('-'.repeat(30) + ' ⚔️ Setup Complete ⚔️ ' + '-'.repeat(30) + '\n');
    console.log(`Should you find yourself in perilous times, summon aid from the Elders at:`);
    console.log(chalk.underline.cyan('https://github.com/wesleybertipaglia/wizard-build/') + '\n');
    console.log('-'.repeat(80));
    console.log('\n');

    // Final message with flair and grandeur
    getRandomFinalMessage();
    console.log('\n');

    // Quest completion reminder
    console.log(`✨ Quest complete! You now embark on your journey alone.`);
    console.log(chalk.green(`  cd ${directory}`));
    console.log(chalk.green(`  npm install`));
    console.log(chalk.green(`  npm run dev`) + '\n\n');
}

const program = new Command();

program
    .name('wizard-build')
    .version('1.0.0')
    .description('A CLI tool to conjure backend projects, powered by magic!')
    .command('init')
    .description('Embark on a quest to initialize a new backend project')
    .action(initProject);

program.parse(process.argv);
