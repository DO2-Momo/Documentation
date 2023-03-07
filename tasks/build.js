const fs = require('node:fs');
const path = require('node:path');
const { mdToPdf } = require('md-to-pdf');

/**
 * Build script for PDFs
 */
(async () => {

    const md_files = fs.readdirSync('./docs')
        .map(file => path.join('./docs', file))
        .filter(file => {
            return !fs.statSync(file).isDirectory() && file.endsWith('.md');
        });

    if (!fs.existsSync('./build')) 
        fs.mkdirSync('./build');

    md_files.forEach(async file => {

        const pdf = await mdToPdf(
            { path: file }
        ).catch(console.error);

        if (pdf) {
            fs.writeFileSync(
                file
                    .replace('.md', '.pdf')
                    .replace('docs', 'build'),
                pdf.content
            );
        }
    });

})();