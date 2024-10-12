#!/usr/bin/env node

import { Command } from 'commander';
import { SetupManager } from './lib/setup/setupManager.js';
import { StoryManager } from './lib/stories/storyManager.js';
import { PromptManager } from './lib/setup/promptManager.js';

async function initProject() {
    const storyManager = new StoryManager();
    const promptManager = new PromptManager();

    // Intro message
    storyManager.displayIntro();

    // Gather the user's choices for the project setup
    const project = await promptManager.getProjectSetup();
    const setup = new SetupManager(project);
    await setup.setupProject();
    console.log('\n');

    // Celebratory message
    storyManager.displayCelebration();

    // Final instructions
    storyManager.displayInstructions(project.directory);

    // Offer guidance for help
    storyManager.displayGuidance();

    // Final message with flair and grandeur
    storyManager.displayFinal();

    // Quest completion reminder
    storyManager.displayQuestComplete(project.directory);
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
