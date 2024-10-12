import { getRandomMessage as getRandomIntroMessage } from './introMessage.js';
import { getRandomMessage as getRandomCelebrationMessage } from './celebrationMessage.js';
import { getRandomMessage as getRandomInstructionMessage } from './instructionMessage.js';
import { getRandomMessage as getRandomFinalMessage } from './finalMessage.js';
import { getHolidayName } from './holidayUtils.js';
import chalk from 'chalk';

export class StoryManager {
    constructor() {
        this.holiday = getHolidayName(new Date());
    }

    displayIntro() {
        getRandomIntroMessage(this.holiday);
        console.log('\n');
    }

    displayCelebration() {
        getRandomCelebrationMessage(this.holiday);
        console.log('\n');
    }

    displayInstructions(directory) {
        getRandomInstructionMessage(directory, this.holiday);
        console.log('\n');
    }

    displayGuidance() {
        console.log('-'.repeat(30) + ' ⚔️ Setup Complete ⚔️ ' + '-'.repeat(30) + '\n');
        console.log(`Should you find yourself in perilous times, summon aid from the Elders at:`);
        console.log(chalk.underline.cyan('https://github.com/wesleybertipaglia/wizard-build/') + '\n');
        console.log('-'.repeat(80));
        console.log('\n');
    }

    displayFinal() {
        getRandomFinalMessage(this.holiday);
        console.log('\n');
    }

    displayQuestComplete(directory) {
        console.log(`✨ Quest complete! You now embark on your journey alone.`);
        console.log(chalk.green(`  cd ${directory}`));
        console.log(chalk.green(`  npm install`));
        console.log(chalk.green(`  npm run dev`) + '\n\n')
    }
}