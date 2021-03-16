import { IFsManager } from './fs_manager';
import { Constans } from '../consts';
import { IConfigurationManager } from './configuration_manager';

export class IndexManager {
  private fsManager: IFsManager;
  private configurationManager: IConfigurationManager;

  constructor(fsManager: IFsManager, configurationManager: IConfigurationManager) {
    this.fsManager = fsManager;
    this.configurationManager = configurationManager;
  }

  async createIndex(loc: string) {
    const fullPath: string = this.fsManager.composeFileLocation(loc, Constans.indexFileName);
    const fileNames: string[] = await this.fsManager.findDirectoryFiles(this.fsManager.getDirName(loc));
    const extensionsToExclude: string[] = this.getExtensionsFromConfig();

    const content = fileNames.filter(
      fileName => this.fsManager.fileFilterPredicate(
        fileName,
        extensionsToExclude,
        Constans.extensionToInclude
      ))
      .filter((name) => name !== Constans.indexFileName)
      .reduce((content, name) => {
        content += `export '${name}';\r\n`;
        return content;
      }, '');

    await this.fsManager.createFile(fullPath, content);
  }

  private getExtensionsFromConfig(): string[] {
    const extensions: string | undefined = this.configurationManager.getExtensionsToExclude();

    if (!extensions) {
      return [];
    }

    return extensions.replace(' ', '').split(',');
  }
}