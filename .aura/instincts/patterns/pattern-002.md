---
id: pattern-002
category: db
language: unknown
score: 50
tags: [db]
---

## 컨텍스트
파일: verify-responsive.mjs (Write 완료)

## 핵심 코드
```unknown
import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const URL = 'http://127.0.0.1:5174/';
const VIEWPORTS = [
  { name: '375px (iPhone SE)', width: 375, height: 812 },
  { name: '390px (iPhone 14)', width: 390, height: 844 },
  { name: '768px (iPad portrait)', width: 768, height: 1024 },
  { name: '820px (iPad Air)', width: 820, height: 1180 },
];

async function checkOverflow(page) {
  return await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const bodyScroll = body.scrollWidth > body.clientWidth;
    const htmlScroll = html.scrollWidth > html.clientWidth;
    return {
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      htmlScrollWidth: html.scrollWidth,
      htmlClientWidth: html.clientWidth,
      hasOverflow: bodyScroll || htmlScroll,
    };
  });
}

async function checkSections(page) {
  return await page.evaluate(() => {
    const results = {};

    // Check about grid columns
    const aboutGrid = document.querySelector('.about-grid');
    if (aboutGrid) {
      const style = window.getComputedStyle(aboutGrid);
      results.aboutGridCols = style.gridTemplateColumns;
    }

    // Check projects grid columns
    const projGrid = document.querySelector('.projects-grid');
    if (projGrid) {
      const style = window.getComputedStyle(projGrid);
      results.projectsGridCols = style.gridTemplateColumns;
    }

    // Check contact inner columns
    const contactInner = document.querySelector('.contact-inner');
    if (contactInner) {
      const style = window.getComputedStyle(contactInner);
      results.contactInnerCols = style.gridTemplateColumns;
```

## 태그
- db