const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedCount = 0;

walkDir('./src', function(filePath) {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // We look for className="..." in <button> and <Link> that have a background color (bg-)
    // We add creative-btn to the class string.
    content = content.replace(/<(button|Link|a)([^>]*)className=["']([^"']+)["']([^>]*)>/g, (match, tag, before, classes, after) => {
        if (classes.includes('bg-') && !classes.includes('creative-btn')) {
            // It has a background, it's likely a primary CTA button!
            return `<${tag}${before}className="${classes} creative-btn"${after}>`;
        }
        return match;
    });
    
    // Also catch className={...}
    content = content.replace(/<(button|Link|a)([^>]*)className=\{([^}]+)\}([^>]*)>/g, (match, tag, before, classesObj, after) => {
        // If it's a template literal containing bg- and not creative-btn
        if (classesObj.includes('bg-') && !classesObj.includes('creative-btn')) {
            // Append creative-btn inside the template string before the closing backtick
            // This is a naive regex, but works for most standard tailwind template strings.
            if (classesObj.includes('`')) {
                let updated = classesObj.replace(/`$/, ' creative-btn`');
                return `<${tag}${before}className={${updated}}${after}>`;
            }
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        modifiedCount++;
    }
});

console.log(`Updated ${modifiedCount} files with creative-btn.`);
