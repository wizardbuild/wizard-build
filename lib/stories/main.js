import { getRandomMessage as __getRandomIntroMessage } from './introMessage.js';
import { getRandomMessage as __getRandomFinalMessage } from './finalMessage.js';
import { getRandomMessage as __getRandomCelebrationMessage } from './celebrationMessage.js';
import { getRandomMessage as __getRandomInstructionMessage } from './instructionMessage.js';
import { getHolidayName } from './holidays.js';

function getHoliday() {
    const today = new Date();
    return getHolidayName(today);
}

export function getRandomIntroMessage() {
    const holiday = getHoliday();
    return __getRandomIntroMessage(holiday);
}

export function getRandomCelebrationMessage() {
    const holiday = getHoliday();
    return __getRandomCelebrationMessage(holiday);
}

export function getRandomInstructionMessage(directory) {
    const holiday = getHoliday();
    return __getRandomInstructionMessage(directory, holiday);
}

export function getRandomFinalMessage() {
    const holiday = getHoliday();
    return __getRandomFinalMessage(holiday);
}
