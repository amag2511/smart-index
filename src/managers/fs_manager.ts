import * as fs from 'fs';
import { promisify } from '../utils/promisify';
import * as path from 'path';

const fsReaddir = promisify(fs.readdir);
const fsStat = promisify(fs.stat);
const fsWriteFile = promisify(fs.writeFile);

export interface IFsManager {
    composeFileLocation(location: string, fileName: string): string;
    getDirName(location: string): string;
    findDirectoryFiles(directory: string): Promise<string[]>;
    fileFilterPredicate(fileName: String, extensionsToExclude: string[], extensionToInclude: string): boolean;
    createFile(fileName: string, content: string): Promise<any>;
}

export class FsManager implements IFsManager {
    createFile(fileName: string, content: string): Promise<any> {
        return fsWriteFile(fileName, content);
    }
    
    composeFileLocation(location: string, fileName: string): string {
        const rootPath = this.getDirName(location);

        return path.join(rootPath, fileName);
    }

    getDirName(location: string): string {
        return fs.lstatSync(location).isDirectory()
            ? location
            : path.dirname(location);
    }

    async findDirectoryFiles(directory: string): Promise<string[]> {
        const files: string[] = await fsReaddir(directory);

        return files.filter(async file => {
            const name = path.join(directory, file);
            const stat: fs.Stats = await fsStat(name);
            return stat.isFile();
        });
    }

    fileFilterPredicate(fileName: String, extensionsToExclude: string[], extensionToInclude: string): boolean {
        try {
            var shouldExcludeName: boolean = extensionsToExclude
                .reduce<boolean>((content, extension) => content || fileName.includes(extension), false);

            if (!shouldExcludeName) {
                return extensionToInclude !== '' && fileName.includes(extensionToInclude);
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message, e.stack);
            return false;
        }
    }
}