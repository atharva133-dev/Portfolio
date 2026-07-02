---
id: pattern-001
category: ui
language: unknown
score: 50
tags: [ui]
---

## 컨텍스트
파일: greedy-toasting-petal.md (Write 완료)

## 핵심 코드
```unknown
# Animate hero portrait with two Framer-Motion transforms

## Context
The portfolio (`src/App.jsx`, a single React + Vite + GSAP page) has one "traveling photo" — a fixed portrait card that GSAP scrubs from the hero into the About section while flipping `rotateY: 180` and turning red. The user designed two transforms in Framer for this same image and wants them recreated:

1. **3D rotational** — `rotateY 0 → 180`, `perspective: 1200`, backface **visible**.
2. **2D / grayscale** — `grayscale(100%)` on the image, `perspective: 1200`.

Both are wired in Framer as a **Scroll Transform** that fires when the bio/`#bio-section` (our `#about`) enters the viewport, using a **Spring** transition.

**Decisions confirmed with the user:**
- Use the **framer-motion** library (new dependency), not GSAP, for the two transforms.
- The flip should reveal **grayscale AND keep the red** tint.
- Trigger **when the About section scrolls into view** (spring), not the current scrubbed hero pin.

Outcome: the photo still travels hero→about via GSAP (unchanged layout), but the flip + grayscale + red now play as a spring animation driven by framer-motion `useInView` on the About section.

## Approach

Clean separation of concerns so GSAP and framer-motion never write the same element's `transform`:
- **Outer wrapper** `.traveling-photo` (`photoRef`) → GSAP keeps controlling travel (`x`, `y`, `scale`). Remove its `rotateY` tween.
- **Inner card** `.portrait-card` (`photoCardRef`) → becomes a `motion.div`, fully owned by framer-motion (`rotateY`, `backgroundColor`, `boxShadow`).
- **Image** → becomes a `motion.img` animating `filter` (grayscale) so the red card background is NOT desaturated (filter on the card would gray the red too).

### 1. Dependency — `package.json`
Add `"framer-motion": "^11.11.0"` to `dependencies` and run `npm install framer-motion`.

### 2. `src/App.jsx`
- Import: `import { motion, useInView, useReducedMotion } from "framer-motion";`
- Add `const aboutSectionRef = useRef(null);` and attach it to `<section id="about" ...>` (this is the Framer `#bio-section` trigger). Optionally also add `id="bio-section"` alias.
- `const reduceMotion = useReducedMotion();`
- `const bioInView = useInView(aboutSectionRef, { amount: 0.4 });` (threshold tunable).
- Convert the portrait markup (currently `App.jsx:266-270`):
  ```jsx
  <div ref={photoRef} className="traveling-photo" aria-hidden="true">
    <motion.div
      ref={photoCardRef}
      className="portrait-card"
      animate={reduceMotion ? {} : {
        rotateY:        bioInView ? 180 : 0,
        backgroundColor: bioInView ? "#C0272A" : "rgba(15,15,15,0.82)",
        boxShadow:       bioInView ? "0 32px 90px rgba(192,39,42,0.35)" : "0 24px 72px rgba(15,15,15,0.32)",
      }}
      transition={{ type: "spring", stiffness: 60, damping: 14 }}
    >
      <motion.img
        src={portrait}
        alt="Atharva"
        animate={reduceMotion ? {} : {
          filter: bioInView ? "grayscale(100%) saturate(0.85) contrast(1.08)"
```

## 태그
- ui