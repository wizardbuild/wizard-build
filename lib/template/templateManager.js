import path from 'path';
import { Logger } from '../log/logger.js';
import { readFile, writeFile } from './templateUtils.js';
import { baseLibrary } from './data/baseLibrary.js';
import { frameworkLibrary, ormLibrary, lintLibrary, testLibrary } from '../dependency/data/index.js';

export class TemplateManager {
    constructor(project) {
        this.project = project;
        this.__dirname = path.dirname(new URL(import.meta.url).pathname);
        this.__templateDir = path.join(this.__dirname, '../../templates');
    }

    init() {
        Logger.info('Creating template files...');

        this.createBaseFiles();
        this.project.useTypescript && this.createTsConfigFile();
        this.createFrameworkFiles();
        this.createOrmFiles();
        this.createLintFiles();
        this.createTestFiles();

        Logger.success('Template files created!');
    }

    createTemplateFile(templateSrc, templateDest) {
        try {
            const content = readFile(templateSrc);
            if (content === null) {
                throw new Error(`Content for ${templateSrc} could not be read.`);
            }

            const destinationPath = path.join(this.project.path, templateDest);
            writeFile(destinationPath, content);
        } catch (err) {
            Logger.error(`Failed to create ${templateDest} from template.`);
            Logger.log(err);
        }
    }

    createTemplateFilesFromList(templateList) {
        if (!Array.isArray(templateList)) {
            Logger.error('Template list is undefined or not an array.');
            return;
        }

        templateList.forEach(({ src, dest }) => this.createTemplateFile(src, dest));
    }

    createTemplateFilesFromLibrary(library, libraryKey) {
        let templateKey = libraryKey.toLowerCase();
        const libraryConfig = library[templateKey];

        if (!libraryConfig) {
            Logger.error(`Library config for ${library} not found.`);
            return;
        }

        const config = this.project.useTypescript ? library[`${templateKey}ts`] || libraryConfig : libraryConfig;

        if (config?.templates) {
            this.createTemplateFilesFromList(config.templates);
        } else {
            Logger.warn(`No templates found for ${library}.`);
        }
    }

    createTsConfigFile() {
        this.createTemplateFile('config/tsconfig.json', 'tsconfig.json');
    }

    createBaseFiles() {
        this.createTemplateFilesFromLibrary(baseLibrary, 'readme');
        this.createTemplateFilesFromLibrary(baseLibrary, 'gitignore');
        this.createTemplateFilesFromLibrary(baseLibrary, 'env');
    }

    createFrameworkFiles() {
        this.createTemplateFilesFromLibrary(frameworkLibrary, this.project.framework);
    }

    createOrmFiles() {
        this.createTemplateFilesFromLibrary(ormLibrary, this.project.orm);
    }

    createLintFiles() {
        this.createTemplateFilesFromLibrary(lintLibrary, this.project.lint);
    }

    createTestFiles() {
        this.createTemplateFilesFromLibrary(testLibrary, this.project.test);
    }
}
