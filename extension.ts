import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	Executable,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// NOTE: C#
	// The server is implemented in c#
	console.log('starting ext');
	const serverModule = context.asAbsolutePath(path.join('server', 'CrossBind.Lang.exe'));

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used xd
	const exe: Executable = {
		transport: TransportKind.stdio,
		command: serverModule,
		options: {},
		args: ['caca.txt'],
	}

	const serverOptions: ServerOptions = {
		run: exe,
		debug: exe,
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'haibt' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/*.hbt')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'HaibtSL',
		'CrossBind Haibt Server Languaje',
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}