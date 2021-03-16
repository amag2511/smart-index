import * as assert from 'assert';

import { FsManager } from '../../managers/fs_manager';
import * as path from 'path';

suite('Fs manager test suite', () => {
    let fsManager: FsManager = new FsManager();

    suite('getDirName method test suite', () => {
        test('pass while pass __dirname as parameter', () => {
            let result = fsManager.getDirName(__dirname);

            assert.strictEqual(result, __dirname);
        });

        test('pass while pass __filename as parameter', () => {
            let result = fsManager.getDirName(__filename);

            assert.strictEqual(result, __dirname);
        });

        test('throws error while pass bad parameter', () => {
            assert.throws(() => fsManager.getDirName(''), {
                name: 'Error'
            });
        });
    });

    suite('composeFileLocation method test suite', () => {
        const fileNameToCompose = 'test.ts';

        test('pass while location parameter is dir', () => {
            let result = fsManager.composeFileLocation(__dirname, fileNameToCompose);

            assert.strictEqual(result, path.join(__dirname, fileNameToCompose));
        });

        test('pass while location parameter is full path to filename in dir', () => {
            let result = fsManager.composeFileLocation(__filename, fileNameToCompose);

            assert.strictEqual(result, path.join(__dirname, fileNameToCompose));
        });

        test('throws error while pass bad location parameter', () => {
            assert.throws(() => fsManager.composeFileLocation('', fileNameToCompose), {
                name: 'Error'
            });
        });
    });

    suite('fileFilter method test suite', () => {
        const filename = 'test.ts';

        test('pass correctly', () => {
            let result = fsManager.fileFilterPredicate(filename, ['bs', 'dart'],'ts');

            assert.strictEqual(result, true);
        });

        test('false if extension included in extensionsToExclude parameter', () => {
            let result = fsManager.fileFilterPredicate(filename, ['ts'], 'ts');

            assert.strictEqual(result, false);
        });

        test('false if extensionToInclude is empty', () => {
            let result = fsManager.fileFilterPredicate(filename, [], '');

            assert.strictEqual(result, false);
        });

        test('false if extensionToInclude not matched', () => {
            let result = fsManager.fileFilterPredicate(filename, [], 'dart');

            assert.strictEqual(result, false);
        });

        test('false if filename is empty', () => {
            let result = fsManager.fileFilterPredicate('', [], 'dart');

            assert.strictEqual(result, false);
        });
    });

    suite('findDirectoryFiles method test suite', () => {
        //todo: to think about findDirectoryFiles method testing
    });
});
