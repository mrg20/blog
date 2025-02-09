const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Function to convert markdown to HTML
async function convertMarkdownToHtml(markdownPath, outputPath) {
  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  const { data: frontmatter, content } = matter(markdown);
  const htmlContent = await marked(content);
  
  // Save both frontmatter and HTML content
  const output = {
    frontmatter,
    content: htmlContent
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output));
}

// Process all markdown files
async function processMarkdownFiles() {
  const profiles = ['marc', 'alba'];
  
  // Process posts
  for (const profile of profiles) {
    const postsDir = path.join(__dirname, `../public/content/posts/${profile}`);
    const outputDir = path.join(__dirname, `../build/content/posts/${profile}`);
    
    fs.ensureDirSync(outputDir);
    
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      const markdownPath = path.join(postsDir, file);
      const outputPath = path.join(outputDir, file.replace('.md', '.json'));
      await convertMarkdownToHtml(markdownPath, outputPath);
    }
  }
  
  // Process profile pages
  const profilesDir = path.join(__dirname, '../public/content/profiles');
  const profilesOutputDir = path.join(__dirname, '../build/content/profiles');
  
  fs.ensureDirSync(profilesOutputDir);
  
  const profileFiles = fs.readdirSync(profilesDir).filter(f => f.endsWith('.md'));
  
  for (const file of profileFiles) {
    const markdownPath = path.join(profilesDir, file);
    const outputPath = path.join(profilesOutputDir, file.replace('.md', '.json'));
    await convertMarkdownToHtml(markdownPath, outputPath);
  }
}

// Copy the public folder (excluding markdown files)
fs.copySync(
  path.join(__dirname, '../public'),
  path.join(__dirname, '../build'),
  { 
    overwrite: true,
    filter: (src) => {
      return !src.endsWith('index.html') && !src.endsWith('.md');
    }
  }
);

// Create .nojekyll
fs.writeFileSync(
  path.join(__dirname, '../build/.nojekyll'),
  ''
);

// Process markdown files
processMarkdownFiles().then(() => {
  console.log('All content processed and copied to build folder');
}); 