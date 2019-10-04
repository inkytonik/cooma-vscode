'use strict';

import { commands, ExtensionContext, window, workspace } from 'vscode';
import { ExitNotification, LanguageClient, LanguageClientOptions, ServerOptions, ShutdownRequest } from 'vscode-languageclient';
import { Monto } from './monto';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const settings = workspace.getConfiguration("cooma");

    const java = settings.get("java", "/usr/bin/java").trim();
    const jar = settings.get("jar", "cooma.jar").trim();
    const classpath = jar;
    const main = "org.bitbucket.inkytonik.cooma.Main";

    const args = [
        "-classpath", classpath,
        main,
        "--server"
    ];

    let serverOptions: ServerOptions = {
        run: {
            command: java,
            args: args,
            options: {}
        },
        debug: {
            command: java,
            args: args.concat(["--debug"]),
            options: {}
        }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'cooma'
            }
        ],
        diagnosticCollectionName: "cooma"
    };

    client = new LanguageClient(
        'coomaLanguageServer',
        'Cooma Language Server',
        serverOptions,
        clientOptions
    );

    Monto.setup("cooma", context, client);

    context.subscriptions.push(
        commands.registerCommand(
            'cooma.restartServer',
            () => {
                window.showInformationMessage('Cooma is restarting');
                client.sendRequest(ShutdownRequest.type).then(() => {
                    client.sendNotification(ExitNotification.type);
                });
            }
        )
    );

    context.subscriptions.push(client.start());
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
