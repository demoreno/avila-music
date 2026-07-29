#!/usr/bin/env node
// Fails the build/lint if any Rioplatense voseo word slips into a source file.
// This store is Venezuelan — copy must always be tuteo (tú), never voseo (vos),
// in BOTH the customer-facing storefront and the admin-only panel. See
// CLAUDE.md and the "no voseo anywhere" project memory for why this exists.
//
// Usage: node scripts/check-voseo.mjs
// Wired into `npm run lint` — run it directly for a quick standalone check.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SCAN_DIRS = ['app', 'components', 'lib']
const EXTENSIONS = new Set(['.ts', '.tsx'])
const SKIP_DIRS = new Set(['node_modules', '.next'])

// Curated list, not a suffix heuristic — Spanish has plenty of legitimate words
// ending in an accented vowel (acá, café, aquí, además, quizás, está, será...)
// that a blanket "-á/-é/-í" regex would false-positive on. Add new voseo words
// here as they're discovered instead of trying to be clever with the pattern.
const VOSEO_WORDS = [
  'vos', 'sos', 'tenés', 'tenes', 'querés', 'queres', 'podés', 'podes', 'sabés',
  'mirá', 'mirás', 'andá', 'andás', 'vení', 'venís', 'usá', 'usás', 'hacé', 'hacés',
  'decí', 'decís', 'escribí', 'escribís', 'creá', 'creás', 'cargá', 'cargás',
  'agregá', 'agregás', 'seleccioná', 'seleccionás', 'explorá', 'explorás',
  'comprá', 'comprás', 'vendé', 'vendés', 'elegí', 'elegís', 'revisá', 'revisás',
  'confirmá', 'confirmás', 'dejá', 'dejás', 'llegá', 'llegás', 'colocá', 'colocás',
  'especificá', 'especificás', 'registrá', 'registrás', 'indicá', 'indicás',
  'esperá', 'esperás', 'conocé', 'conocés', 'visitanos', 'contactanos', 'fijate',
  'acordate', 'quedate', 'volvé', 'volvés', 'entrá', 'entrás', 'salí', 'salís',
  'jugá', 'jugás', 'probá', 'probás', 'pedí', 'pedís', 'cotizá', 'cotizás',
  'reservá', 'reservás', 'ganá', 'ganás', 'sumá', 'sumás',
  'escuchá', 'escuchás', 'notá', 'notás', 'tocás', 'creés', 'sentís', 'vivís',
  'llegás', 'apurate', 'metete', 'pasate',
  // NOTE: "animate"/"imaginate" deliberately excluded — they collide with
  // Tailwind's `animate-*` utility class prefix (word boundary splits on "-").
]

const VOSEO_REGEX = new RegExp(`\\b(${VOSEO_WORDS.join('|')})\\b`, 'iu')

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      yield* walk(fullPath)
    } else if (EXTENSIONS.has(extname(entry))) {
      yield fullPath
    }
  }
}

const findings = []

for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      const match = line.match(VOSEO_REGEX)
      if (match) findings.push({ file, line: i + 1, word: match[0], text: line.trim() })
    })
  }
}

if (findings.length > 0) {
  console.error(`\n✖ Voseo encontrado en ${findings.length} lugar(es) — esta tienda es venezolana, siempre tuteo:\n`)
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line} — "${f.word}"`)
    console.error(`    ${f.text}`)
  }
  console.error('')
  process.exit(1)
} else {
  console.log('✓ Sin voseo detectado en app/, components/, lib/')
}
