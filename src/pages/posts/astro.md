---
title: "🚀 Hello, Astro!"
desc: "A shiny new website brought to you with Astro"
published: 2025-09-25
layout: "../../layouts/Post.astro"
tags: ["Meta", "Astro", "HTML", "TypeScript", "Bun"]
---

I rewrote this website (yes, the one you're on!) in [Astro](https://astro.build/).

## Why?

### I've improved

The _main_ website design isn't terrible, so I only slightly refactored that.

Major design changes to come soon, specifically with the way I display projects.

### Next.js let me down

I built this website with Next.js under the fine, but naïve impression that it was a good framework for production.

There were a few issues I've encountered with using next briefly on linux, and issues getting it to work with [Bun](http://bun.sh), but those are minor.

Problem is, for a small project like this, it's overkill. Also, it's very slow.

### I fell in love with Astro

My frontend journey started with Svelte for its simplicity, moved to React for its superior ecosystem and explicit state and then to Solid.js for performance and dx.

I heard about Astro but it was often marketed as just something for static pages - which, of course is ideal for this, but for most of my projects wouldn't be. So I ignored it for a while.

It's pretty fun to work with. It's essentially the original concept of Svelte - without shoehorning in any form of state. It doesn't try to tackle that practically impossible task (Svelte even gave up, and went with runes instead of implicit state).

Instead, everything is statically generated (or optionally serverside generated) at once, and you can opt-in to clientside components written in _any framework_ you'd like. Any framework. As in, svelte, react, solid, etc...

It's also incredibly fast, and real companies (not just startups...) rely on it.

So yeah. I won't stop using Solid (and React) for more reactive projects, like [my Invidious frontend project](https://github.com/codebycruz/riptire), but Astro is my new favorite framework for sure.

## Conclusion

Projects view is temporarily down pending design changes.

I'll get it right this time instead of rushing into a design I'm not happy with.

Other than that, the design is mostly unchanged, perhaps a bit cleaner and with more contrast (new coat of paint, definitely not for accessibility...)
