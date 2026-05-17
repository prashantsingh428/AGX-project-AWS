const fs = require('fs');
const files = [
  'client/src/pages/Blog.jsx',
  'client/src/pages/BlogDetail.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/text-\[\#ff7043\]/g, 'text-primary');
  content = content.replace(/bg-\[\#ff7043\]/g, 'bg-primary');
  content = content.replace(/border-\[\#ff7043\]/g, 'border-primary');
  content = content.replace(/hover:border-\[\#ff7043\]/g, 'hover:border-primary');
  content = content.replace(/hover:text-\[\#ff7043\]/g, 'hover:text-primary');
  content = content.replace(/shadow-orange-500\/20/g, 'shadow-primary/20');
  content = content.replace(/hover:bg-orange-600/g, 'hover:bg-primary/90');
  content = content.replace(/hover:bg-orange-50/g, 'hover:bg-primary/10');
  content = content.replace(/bg-orange-50/g, 'bg-primary/5');
  content = content.replace(/from-\[\#ff7043\] to-orange-200/g, 'from-primary to-primary/40');
  content = content.replace(/from-amber-500 to-orange-500/g, 'from-primary to-blue-500');
  content = content.replace(/text-\[\#ff7043\]\/20/g, 'text-primary/20');
  content = content.replace(/bg-\[\#ff7043\]\/10/g, 'bg-primary/10');
  // Catch any remaining direct hex codes
  content = content.replace(/#ff7043/g, '#1d4ed8'); // generic blue-700 fallback just in case
  
  fs.writeFileSync(file, content);
  console.log(`Updated colors in ${file}`);
});
