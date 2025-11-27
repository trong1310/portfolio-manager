const fs = require('fs');
const path = require('path');

function dasherize(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

function classify(name) {
  return name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function camelize(name) {
  const c = classify(name);
  return c.charAt(0).toLowerCase() + c.slice(1);
}

function render(content, name) {
  return content
    .replace(/<%=\s*classify\(name\)\s*%>/g, classify(name))
    .replace(/<%=\s*dasherize\(name\)\s*%>/g, dasherize(name))
    .replace(/<%=\s*camelize\(name\)\s*%>/g, camelize(name));
}

function copyTemplates(name) {
  const templatesRoot = path.join(__dirname, '..', 'schematics', 'custom-resource', 'files', 'src');
  const destRoot = path.join(__dirname, '..', 'src');

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });
    items.forEach(item => {
      const full = path.join(currentPath, item.name);
      if (item.isDirectory()) {
        walk(full);
      } else if (item.isFile()) {
        const rel = path.relative(templatesRoot, full);
        let outRel = rel.replace(/__name__/g, name);
        outRel = outRel.replace(/\.template$/, '');
        const outPath = path.join(destRoot, outRel);
        const outDir = path.dirname(outPath);
        fs.mkdirSync(outDir, { recursive: true });
        const content = fs.readFileSync(full, 'utf8');
        const rendered = render(content, name);
        fs.writeFileSync(outPath, rendered, 'utf8');
        console.log('Created', outPath);
      }
    });
  }

  if (!fs.existsSync(templatesRoot)) {
    console.error('Templates not found:', templatesRoot);
    process.exit(1);
  }
  walk(templatesRoot);
}

if (require.main === module) {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: node generate-resource.js <name>');
    process.exit(1);
  }
  copyTemplates(name);
}
