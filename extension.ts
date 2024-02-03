import { LanguageClient } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate() {
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}