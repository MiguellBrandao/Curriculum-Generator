const fs = require('fs');
const path = require('path');

const lang = process.argv[2] || 'pt';
const variant = process.argv[3] || 'fullstack'; // 'fullstack' or 'backend'

if (!['pt', 'en'].includes(lang)) {
  console.error("Invalid language. Use 'pt' or 'en'.");
  process.exit(1);
}

if (!['fullstack', 'backend'].includes(variant)) {
  console.error("Invalid variant. Use 'fullstack' or 'backend'.");
  process.exit(1);
}

const dataPath = path.join(__dirname, 'data', lang + '.json');
const templatePath = path.join(__dirname, 'template.html');

if (!fs.existsSync(dataPath)) {
  console.error("Data file not found: " + dataPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
let template = fs.readFileSync(templatePath, 'utf-8');

const variantData = data.variants[variant];
const projects = variantData.projects || data.projects || [];

const skillsHtml = variantData.skills.map(s => '<div class="skill-row">' + s + '</div>').join('\n      ');

const experienceHtml = variantData.experience.map(exp => `
    <article class="exp-item">
      <div class="exp-head">
        <p class="exp-title">${exp.title}</p>
        <div class="exp-date">${exp.date}</div>
      </div>
      <div class="exp-sub">${exp.sub}</div>
      <ul>
        ${exp.bullets.map(b => '<li>' + b + '</li>').join('\n        ')}
      </ul>
    </article>`).join('');

const projectsHtml = projects.map(proj => `
    <div class="exp-item" style="margin-top:7px;">
      <div class="exp-head">
        <p class="exp-title">${proj.title}</p>
        <div class="exp-date">${proj.date}</div>
      </div>
      <div class="exp-sub">${proj.sub}</div>
      <ul>
        ${proj.bullets.map(b => '<li>' + b + '</li>').join('\n        ')}
      </ul>
    </div>`).join('');

const educationHtml = data.education.map(edu => `
    <div class="edu-row">
      <div>
        <p class="edu-title">${edu.title}</p>
        <div class="edu-meta">${edu.meta}</div>
      </div>
      <div class="exp-date">${edu.date}</div>
    </div>`).join('');

template = template
  .replace(/\{\{lang\}\}/g, lang)
  .replace(/\{\{name\}\}/g, data.name)
  .replace(/\{\{headline\}\}/g, variantData.headline)
  .replace(/\{\{contact_location\}\}/g, data.contact.location)
  .replace(/\{\{contact_email\}\}/g, data.contact.email)
  .replace(/\{\{contact_linkedin\}\}/g, data.contact.linkedin)
  .replace(/\{\{contact_github\}\}/g, data.contact.github)
  .replace(/\{\{label_summary\}\}/g, data.labels.summary)
  .replace(/\{\{label_skills\}\}/g, data.labels.skills)
  .replace(/\{\{label_experience\}\}/g, data.labels.experience)
  .replace(/\{\{label_projects\}\}/g, data.labels.projects)
  .replace(/\{\{label_education\}\}/g, data.labels.education)
  .replace(/\{\{summary\}\}/g, variantData.summary)
  .replace(/\{\{skills_html\}\}/g, skillsHtml)
  .replace(/\{\{experience_html\}\}/g, experienceHtml)
  .replace(/\{\{projects_html\}\}/g, projectsHtml)
  .replace(/\{\{education_html\}\}/g, educationHtml);

const outName = variant + '-' + lang + '.html';
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, outName), template);
console.log('Successfully generated ' + outName + ' into dist/');
