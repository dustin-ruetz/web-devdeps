# web-devdeps

Package that provides standardized dependencies and configurations for other JavaScript/TypeScript projects to consume.

- This project bootstraps and dogfoods its own configuration files by 1) using `tsc` to compile the src/\*.ts files to the lib/\*.js directory, and 2) pointing all config paths to the compiled lib/\*.js files.
- It requires the `consuming-repo` to have the following commonly-used folder/file structure:

```text
// Created using the `Shinotatwu-DS.file-tree-generator` extension for Visual Studio Code.
📂 consuming-repo
┣ 📂 node_modules
┃ ┗ 📂 @dustin-ruetz/web-devdeps
┃ ┃ ┗ 📂 lib
┃ ┃ ┃ ┗ 📄 *.config.js
┃ ┃ ┗ 📄 tsconfig.json
┗ 📄 package.json
┗ 📄 tsconfig.json
```
