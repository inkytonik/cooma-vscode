'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageclient_1 = require("vscode-languageclient");
let client;
function activate(context) {
    let java = "/usr/bin/java";
    let args = [
        "-classpath",
        "/Users/asloane/Projects/Kiama/kiama/extras/target/scala-2.12/kiama-extras-assembly-2.3.0-SNAPSHOT-tests.jar",
        "org.bitbucket.inkytonik.kiama.example.minijava.Main",
        "--server"
    ];
    let serverOptions = {
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
    let clientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'cooma'
            }
        ],
        diagnosticCollectionName: "cooma"
    };
    client = new vscode_languageclient_1.LanguageClient('coomaLanguageServer', 'Cooma Language Server', serverOptions, clientOptions);
    context.subscriptions.push(client.start());
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map