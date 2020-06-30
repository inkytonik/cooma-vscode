# Cooma Language Support

Language extension for the Cooma language.

Anthony M. Sloane

Programming Languages and Verification Research Group,
Department of Computing,
Macquarie University

## Prerequisites

You'll need the Cooma development source code and to use the `sbt assembly` command to make an all-in-one jar.
The all-in-one jar should be created at `target/scala-2.13/cooma.jar` in your Cooma working directory.

## Setup

Before the server will run properly you'll need to configure the following settings:

* `cooma.java`: path to Java runtime

* `cooma.jar`: path to the Cooma "all-in-one" jar

The other Cooma settings can be adjusted as desired to get the extension to show you information derived from a Cooma program that you are editing.
Possibilities include the source tree representation of the program and the intermediate representation code.
See the Cooma settings documentation for details.

## Features

The extension provides rudimentary syntax highlighting for Cooma files and Cooma IR files.

In addition, the Cooma language server starts automatically when you open a `.cooma` file.
If you want to restart with a new version of Cooma, use the 'Cooma: Restart server' command.

The language server supports:

* Problems display of messages from the Cooma compiler.

* Hover help when moving the cursor over identifier uses.

* In some cases, linking from additional displays of Cooma information to the Cooma file, and vice versa.
  E.g., if you are showing the Cooma Source Tree display, clicking on a node should focus the relevant source code.
  Use the "Cooma: Focus Product Editors" command to go in the other direction.
