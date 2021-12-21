const fs = require('fs'),
    http = require('http'),
    {
        lstatSync
    } = require('fs'),
    path = require('path'),
    yargs = require('yargs'),
    inquirer = require('inquirer'),
    process = require('process');

(async () => {
    const isFile = (path) => fs.lstatSync(path).isFile();

    http.createServer((req, res) => {

        const fullPath = path.join(process.cwd(), req.url);

        console.log(fullPath); //получаем полный путь

        if (!fs.existsSync(fullPath)) {
            return res.end('File or directory not found');
        }

        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res);
        }

        let linksList = '';

        fs.readdirSync(fullPath)
            .forEach(fileName => {
                const filePath = path.join(req.url, fileName);
                linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
            });
        const HTML = fs
            .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
            .replace('Links', linksList);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        return res.end(linksList);
    }).listen(3000);
})();