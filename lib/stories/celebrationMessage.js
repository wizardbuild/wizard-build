import chalk from 'chalk';
import { getRandomMessage as __getRandomMessage } from './storyUtils.js'

const defaultMessages = [
    () => {
        console.log(chalk.bold(`🌟 Congratulations, noble mage, your spellbook is ready!`));
    },
    () => {
        console.log(chalk.bold(`✨ The stars align in your favor, valiant coder, your arcane project is born!`));
    },
    () => {
        console.log(chalk.bold(`⚔️ Bravo, brave wizard! Your magical project has come to life!`));
    },
    () => {
        console.log(chalk.bold(`🎇 Your coding incantations have been woven into a powerful project. Victory is yours!`));
    },
    () => {
        console.log(chalk.bold(`🔮 The code flows through your fingers like ancient spells. The project is complete!`));
    }
];

const holidayMessages = {
    easter: [
        () => {
            console.log(chalk.pink(`🥚 Happy Easter, coding master! May your project blossom like spring flowers! 🌷`));
        },
        () => {
            console.log(chalk.blue(`🐇 Hop into success this Easter—your code is as vibrant as a basket of eggs! 🌸`));
        },
        () => {
            console.log(chalk.green(`🌷 Spring has sprung, and so has your project! Celebrate with bug-free code! 🐣`));
        }
    ],
    fourthOfJuly: [
        () => {
            console.log(chalk.red(`🎆 Happy 4th of July! Let your code explode with brilliance, just like fireworks in the sky! 🗽`));
        },
        () => {
            console.log(chalk.blue(`🗽 Celebrate freedom by building your most powerful and independent project yet! 🎇`));
        },
        () => {
            console.log(chalk.white(`🎇 Dazzle the world with code that shines brighter than the 4th of July fireworks! 🎆`));
        }
    ],
    halloween: [
        () => {
            console.log(chalk.cyanBright(`🎃 Happy Halloween, Code Sorcerer! Beware of haunted bugs lurking in the shadows! 🕸️`));
        },
        () => {
            console.log(chalk.magenta(`👻 Spooky lines of code await you! May your spells be strong and your errors few this Halloween! 💀`));
        },
        () => {
            console.log(chalk.greenBright(`🕸️ On this eerie night, may your code be as sharp as a witch’s broomstick! 🎃`));
        }
    ],
    thanksgiving: [
        () => {
            console.log(chalk.yellow(`🦃 Happy Thanksgiving, coding wizard! May your code be as bountiful as a harvest feast! 🍂`));
        },
        () => {
            console.log(chalk.orange(`🍁 On this day of thanks, be grateful for clean syntax and smooth builds! 🍂`));
        },
        () => {
            console.log(chalk.brown(`🥧 Feast on success, for your project is as delicious as pumpkin pie! 🦃`));
        }
    ],
    christmas: [
        () => {
            console.log(chalk.green(`🎄 Merry Christmas, mighty coder! May your code shine bright like the North Star! 🎅`));
        },
        () => {
            console.log(chalk.red(`🎁 As the holiday magic swirls, your project is a gift to the digital world. 🎁`));
        },
        () => {
            console.log(chalk.blue(`❄️ Let your code sparkle like fresh snow this Christmas. Enjoy the festive success! 🎄`));
        }
    ],
    newYears: [
        () => {
            console.log(chalk.yellow(`🎆 Happy New Year, coding sorcerer! Start the year with powerful spells and flawless code! 🎇`));
        },
        () => {
            console.log(chalk.cyan(`🎉 A new year, a new code journey! May your builds be fast and your bugs few! 🥂`));
        },
        () => {
            console.log(chalk.blue(`✨ Step into the new year with confidence—your project is destined for greatness! 🎇`));
        }
    ]
};

export function getRandomMessage(holiday) {
    __getRandomMessage(defaultMessages, holidayMessages, holiday);
}
