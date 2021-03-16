import * as vscode from 'vscode';
import { ConfigurationManager } from './managers/configuration_manager';
import { Constans } from './consts';
import { FsManager } from './managers/fs_manager';
import { IndexManager } from './managers/index_manager';

export function activate(context: vscode.ExtensionContext) {
	const indexManager = new IndexManager(new FsManager(), new ConfigurationManager());

	let indexCommand = vscode.commands.registerCommand(Constans.indexCommandKey, async (args) => {
		await indexManager.createIndex(args.fsPath);
	});

	context.subscriptions.push(indexCommand);
}