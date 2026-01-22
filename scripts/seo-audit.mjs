#!/usr/bin/env node

/**
 * SEO Audit Script for Transcendence Work
 * Analyzes SEO performance for Moroccan market in:
 * - Yoga services
 * - Coaching services
 * - Organization consultancies
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Target keywords for Moroccan market
const TARGET_KEYWORDS = {
  yoga: [
    'yoga casablanca',
    'hatha yoga maroc',
    'cours yoga casablanca',
    'yoga traditionnel maroc',
    'professeur yoga casablanca',
    'isha yoga maroc',
    'sadhguru gurukulam',
    'upa yoga',
    'surya kriya',
    'angamardana',
    'yogasanas',
    'formation yoga maroc',
  ],
  coaching: [
    'coach casablanca',
    'coaching maroc',
    'coach professionnel casablanca',
    'coaching individuel maroc',
    'développement personnel casablanca',
    'coach certifié maroc',
    'transformance pro',
    'coaching holistique',
  ],
  organisations: [
    'conseil entreprise casablanca',
    'consultant organisation maroc',
    'formation entreprise casablanca',
    'team building maroc',
    'accompagnement dirigeants',
    'coaching équipe casablanca',
    'transformation organisationnelle',
  ],
};

// Local SEO signals for Morocco
const LOCAL_SEO_SIGNALS = [
  'casablanca',
  'maroc',
  'morocco',
  'anfa',
  '+212',
  'MAD',
  'dirham',
];

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(` ${title}`, 'bright');
  console.log('='.repeat(60));
}

function logSubSection(title) {
  console.log('\n' + '-'.repeat(40));
  log(` ${title}`, 'cyan');
  console.log('-'.repeat(40));
}

// Read locale files
function readLocaleFiles() {
  const frPath = path.join(rootDir, 'locales', 'fr.json');
  const enPath = path.join(rootDir, 'locales', 'en.json');

  const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  return { fr, en };
}

// Extract all text from locale object
function extractAllText(obj, prefix = '') {
  let texts = [];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      texts.push({ key: prefix + key, value: value.toLowerCase() });
    } else if (typeof value === 'object' && value !== null) {
      texts = texts.concat(extractAllText(value, prefix + key + '.'));
    }
  }
  return texts;
}

// Check keyword presence
function analyzeKeywords(texts, keywords, category) {
  logSubSection(`Mots-clés: ${category.toUpperCase()}`);

  const results = [];

  for (const keyword of keywords) {
    const found = texts.some(t => t.value.includes(keyword.toLowerCase()));
    const status = found ? '✅' : '❌';
    const color = found ? 'green' : 'red';
    log(`  ${status} "${keyword}"`, color);
    results.push({ keyword, found });
  }

  const foundCount = results.filter(r => r.found).length;
  const percentage = Math.round((foundCount / keywords.length) * 100);

  console.log();
  log(`  Score: ${foundCount}/${keywords.length} (${percentage}%)`, percentage >= 70 ? 'green' : percentage >= 40 ? 'yellow' : 'red');

  return { category, foundCount, total: keywords.length, percentage };
}

// Check local SEO signals
function analyzeLocalSEO(texts) {
  logSubSection('Signaux SEO Local (Maroc)');

  const results = [];

  for (const signal of LOCAL_SEO_SIGNALS) {
    const occurrences = texts.filter(t => t.value.includes(signal.toLowerCase())).length;
    const status = occurrences > 0 ? '✅' : '❌';
    const color = occurrences > 0 ? 'green' : 'red';
    log(`  ${status} "${signal}" - ${occurrences} occurrence(s)`, color);
    results.push({ signal, occurrences });
  }

  const foundCount = results.filter(r => r.occurrences > 0).length;
  const percentage = Math.round((foundCount / LOCAL_SEO_SIGNALS.length) * 100);

  console.log();
  log(`  Score: ${foundCount}/${LOCAL_SEO_SIGNALS.length} (${percentage}%)`, percentage >= 70 ? 'green' : percentage >= 40 ? 'yellow' : 'red');

  return { foundCount, total: LOCAL_SEO_SIGNALS.length, percentage };
}

// Analyze page files for meta tags
function analyzePageFiles() {
  logSubSection('Pages avec Metadata SEO');

  const appDir = path.join(rootDir, 'app');
  const pages = [];

  function scanDir(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('_') && !item.startsWith('.')) {
        scanDir(fullPath, prefix + '/' + item);
      } else if (item === 'page.tsx') {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
        const route = prefix || '/';
        pages.push({ route, hasMetadata, path: fullPath });
      }
    }
  }

  scanDir(appDir);

  for (const page of pages) {
    const status = page.hasMetadata ? '✅' : '⚠️';
    const color = page.hasMetadata ? 'green' : 'yellow';
    log(`  ${status} ${page.route}`, color);
  }

  const withMeta = pages.filter(p => p.hasMetadata).length;
  console.log();
  log(`  Pages avec metadata: ${withMeta}/${pages.length}`, withMeta === pages.length ? 'green' : 'yellow');

  return pages;
}

// Check structured data
function analyzeStructuredData() {
  logSubSection('Données Structurées (JSON-LD)');

  const structuredDataPath = path.join(rootDir, 'lib', 'structured-data.ts');

  if (!fs.existsSync(structuredDataPath)) {
    log('  ❌ Fichier structured-data.ts non trouvé', 'red');
    return { hasStructuredData: false };
  }

  const content = fs.readFileSync(structuredDataPath, 'utf-8');

  const schemas = [
    { name: 'Organization/LocalBusiness', pattern: /LocalBusiness|Organization/ },
    { name: 'Person', pattern: /Person/ },
    { name: 'WebSite', pattern: /WebSite/ },
    { name: 'Service', pattern: /Service/ },
    { name: 'FAQ', pattern: /FAQPage/ },
  ];

  for (const schema of schemas) {
    const found = schema.pattern.test(content);
    const status = found ? '✅' : '❌';
    const color = found ? 'green' : 'red';
    log(`  ${status} Schema ${schema.name}`, color);
  }

  return { hasStructuredData: true };
}

// Check sitemap and robots
function analyzeRobotsAndSitemap() {
  logSubSection('Fichiers SEO Techniques');

  const files = [
    { name: 'robots.txt', path: path.join(rootDir, 'public', 'robots.txt') },
    { name: 'sitemap.xml', path: path.join(rootDir, 'public', 'sitemap.xml') },
    { name: 'sitemap.ts (dynamic)', path: path.join(rootDir, 'app', 'sitemap.ts') },
  ];

  for (const file of files) {
    const exists = fs.existsSync(file.path);
    const status = exists ? '✅' : '❌';
    const color = exists ? 'green' : 'red';
    log(`  ${status} ${file.name}`, color);
  }
}

// Generate recommendations
function generateRecommendations(keywordResults, localSEOResult) {
  logSection('📋 RECOMMANDATIONS');

  const recommendations = [];

  // Keyword recommendations
  for (const result of keywordResults) {
    if (result.percentage < 50) {
      recommendations.push({
        priority: 'HIGH',
        category: result.category,
        message: `Améliorer la couverture des mots-clés "${result.category}" (actuellement ${result.percentage}%)`,
      });
    }
  }

  // Local SEO recommendations
  if (localSEOResult.percentage < 70) {
    recommendations.push({
      priority: 'HIGH',
      category: 'Local SEO',
      message: 'Renforcer les signaux de localisation marocaine dans le contenu',
    });
  }

  // Standard recommendations
  recommendations.push({
    priority: 'MEDIUM',
    category: 'Contenu',
    message: 'Ajouter des pages dédiées pour chaque service avec contenu localisé',
  });

  recommendations.push({
    priority: 'MEDIUM',
    category: 'Local SEO',
    message: 'Créer une fiche Google My Business si pas encore fait',
  });

  recommendations.push({
    priority: 'LOW',
    category: 'Backlinks',
    message: 'Rechercher des partenariats avec des sites marocains (annuaires, blogs)',
  });

  for (const rec of recommendations) {
    const color = rec.priority === 'HIGH' ? 'red' : rec.priority === 'MEDIUM' ? 'yellow' : 'blue';
    log(`\n  [${rec.priority}] ${rec.category}`, color);
    log(`  → ${rec.message}`, 'reset');
  }
}

// Main audit function
async function runAudit() {
  console.clear();
  log('\n🔍 AUDIT SEO - TRANSCENDENCE WORK', 'bright');
  log('   Marché cible: Maroc (Casablanca)', 'cyan');
  log('   Secteurs: Yoga, Coaching, Conseil Organisations\n', 'cyan');

  // Read locale files
  const { fr, en } = readLocaleFiles();
  const frTexts = extractAllText(fr);
  const enTexts = extractAllText(en);
  const allTexts = [...frTexts, ...enTexts];

  log(`📄 ${frTexts.length} entrées FR + ${enTexts.length} entrées EN analysées`, 'blue');

  // Analyze keywords
  logSection('🎯 ANALYSE DES MOTS-CLÉS');

  const keywordResults = [];
  for (const [category, keywords] of Object.entries(TARGET_KEYWORDS)) {
    const result = analyzeKeywords(allTexts, keywords, category);
    keywordResults.push(result);
  }

  // Analyze local SEO
  logSection('📍 SEO LOCAL - MAROC');
  const localSEOResult = analyzeLocalSEO(allTexts);

  // Analyze technical SEO
  logSection('⚙️ SEO TECHNIQUE');
  analyzePageFiles();
  analyzeStructuredData();
  analyzeRobotsAndSitemap();

  // Generate recommendations
  generateRecommendations(keywordResults, localSEOResult);

  // Final score
  logSection('📊 SCORE GLOBAL');

  const avgKeywords = Math.round(keywordResults.reduce((sum, r) => sum + r.percentage, 0) / keywordResults.length);
  const globalScore = Math.round((avgKeywords + localSEOResult.percentage) / 2);

  log(`\n  Mots-clés: ${avgKeywords}%`, avgKeywords >= 70 ? 'green' : avgKeywords >= 40 ? 'yellow' : 'red');
  log(`  SEO Local: ${localSEOResult.percentage}%`, localSEOResult.percentage >= 70 ? 'green' : localSEOResult.percentage >= 40 ? 'yellow' : 'red');
  console.log('  ' + '-'.repeat(20));
  log(`  SCORE GLOBAL: ${globalScore}%\n`, globalScore >= 70 ? 'green' : globalScore >= 40 ? 'yellow' : 'red');

  if (globalScore >= 70) {
    log('  ✅ Bon positionnement SEO pour le marché marocain', 'green');
  } else if (globalScore >= 40) {
    log('  ⚠️ Améliorations nécessaires pour le marché marocain', 'yellow');
  } else {
    log('  ❌ Travail SEO important requis', 'red');
  }

  console.log('\n');
}

runAudit().catch(console.error);
