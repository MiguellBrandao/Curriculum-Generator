# Miguel Brandão - Curriculum Generator

This project is a static resume generator. It allows for the automatic creation of multiple versions of my professional resume (Full Stack or Backend) in different languages from a single source of truth.

## 📌 Why does this project exist?

Maintaining a resume up-to-date in different languages and targeting the content for specific roles (like pure Backend vs Full Stack) used to be a manual, repetitive, and formatting-error-prone process.

This project solves that problem by separating the **data** (texts, experiences, projects) from the **presentation** (HTML/CSS).

## 🗂️ How is it structured?

The project's architecture is simple and based on Node.js (without heavy external dependencies). The `src/` folder holds the JSON data files where the resume content lives, and an HTML template. The build script merges the chosen data with the template to produce the formatted resumes inside the `dist/` folder.

## 🚀 How to use

### Prerequisites

- Have [Node.js](https://nodejs.org/) installed.

### Build Commands

At the root of the project, you can use npm to generate your resumes.

**Generate all variations at once:**

```bash
npm run build:all
```

_This will generate all the combinations configured in `package.json` into the `dist/` folder._

**Generate a specific variation:**

The syntax is `npm run build [language] [variant]`.

Examples:

```bash
# Generate the Full Stack resume in Portuguese
npm run build pt fullstack

# Generate the Backend resume in English
npm run build en backend
```

## 📝 How to update the resume

If you want to add a new project or professional experience:

1. Open the JSON files in `src/data/` (e.g., `pt.json` and `en.json`).
2. Add the respective text to the corresponding arrays (`experience`, `projects`, etc.).
3. Run `npm run build:all`.
4. Open the generated HTML inside `dist/` in your browser and use the shortcut `Ctrl + P` (or `Cmd + P`) to "Print as PDF". The margins and formatting are already prepared for A4 paper!

## 🌍 How to add a new language

To add support for a new language (e.g., Spanish - `es`):

1. **Create the data file:**
   Create a new file in `src/data/` named after the language code, for example, `es.json`.
2. **Translate the content:**
   Copy the entire JSON structure from an existing file (like `en.json`) into `es.json` and translate the text values.
3. **Build the new language:**
   You can now generate resumes using the new language code:
   ```bash
   npm run build es fullstack
   ```
4. **Update the `build:all` script (optional):**
   If you want the `npm run build:all` command to automatically generate the new language variants as well, add them to the `build:all` script in the `package.json` file. Example:
   ```json
   "build:all": "npm run build pt fullstack && npm run build en fullstack && npm run build es fullstack && npm run build pt backend && npm run build en backend && npm run build es backend"
   ```
