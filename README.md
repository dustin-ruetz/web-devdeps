# @dustin-ruetz/devdeps

Package that provides development dependencies and standardized configurations for other JavaScript/TypeScript projects (both web and Node.js) to consume.

- This project bootstraps and dogfoods its own configuration files by 1) using `tsc` to compile the `src/` directory's `*.ts` files to the `lib/` directory's `*.js` files, and 2) pointing all config paths to the compiled `lib/\*.js` files.
- It requires the `consuming-repo` to have the following commonly-used folder/file structure:

```text
// Created using the `Shinotatwu-DS.file-tree-generator` extension for Visual Studio Code.
📂 consuming-repo
┣ 📂 node_modules
┃ ┗ 📂 @dustin-ruetz/devdeps
┃ ┃ ┗ 📂 lib
┃ ┃ ┃ ┗ 📄 *.config.js
┃ ┃ ┗ 📄 tsconfig.json
┗ 📄 package.json
┗ 📄 tsconfig.json
```
