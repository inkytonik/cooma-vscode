'use strict';

import { ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    let java = "/usr/bin/java";

    let args = [
        "-classpath",
        "/Users/asloane/Projects/Kiama/kiama/extras/target/scala-2.12/kiama-extras-assembly-2.3.0-SNAPSHOT-tests.jar",
        "org.bitbucket.inkytonik.kiama.example.minijava.Main",
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

    context.subscriptions.push(client.start());
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
