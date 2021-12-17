const fs = require('fs/promises');
const {
    lstatSync
} = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

let curentDir = process.cwd();
const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    }).argv;
console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

(async () => {
    const list = await fs.readdir(curentDir);
    const items = list.map(fileName =>
        new ListItem(path.join(curentDir, fileName), fileName));

    const item = await inquirer
        .prompt([{
            name: 'fileName',
            type: 'list',
            message: `Choose: ${curentDir}`,
            choices: items.map(item => ({
                name: item.fileName,
                value: item
            })),
        }])
        .then(
            answer => answer.fileName
            // ({
            //     fileName
            // }) => {
            //     const fullPath = path.join(curentDir, fileName);
            //     const data = fs.readFileSync(fullPath, 'utf-8');

            //     console.log(data);
            // }
        );


})();