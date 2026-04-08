# Design Brief

## Direction

Cool Serene Finance — a data-driven investment platform with authoritative yet approachable design language, grounded in deep ocean blues with cool neutrals.

## Tone

Professional clarity with warmth. Deep ocean primary conveys trust and stability; cool backgrounds reinforce clarity for data analysis; warm success green provides positive reinforcement for investment decisions.

## Differentiation

Color-coded data states (success/warning/destructive badges) directly embedded in UI patterns for fund data, combined with subtle gradient text on primary headings to signal premium experience without decoration.

## Color Palette

| Token          | OKLCH          | Role                           |
| -------------- | -------------- | ------------------------------ |
| background     | 0.98 0.008 230 | Light cool off-white           |
| foreground     | 0.18 0.015 230 | Deep cool-dark text            |
| card           | 1.0 0.004 230  | Pure white with cool tint      |
| primary        | 0.42 0.14 240  | Deep ocean blue (authority)    |
| accent         | 0.6 0.15 170   | Cool teal (data highlight)     |
| success        | 0.55 0.16 150  | Muted green (positive returns) |
| warning        | 0.7 0.15 85    | Warm amber (caution/risk)      |
| destructive    | 0.55 0.22 25   | Red (loss/error)               |
| muted          | 0.94 0.01 230  | Light grey (secondary)         |
| border         | 0.9 0.008 230  | Cool border accent             |

## Typography

- Display: Space Grotesk — modern, confident, tech-forward for headings and data hierarchy
- Body: General Sans — clean, readable, approachable for content and UI labels
- Scale: h1 `text-4xl md:text-5xl font-bold`, h2 `text-2xl md:text-3xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Minimal shadow hierarchy: `shadow-xs` (subtle, 2px) for cards and inputs, `shadow-elevated` (8px) sparingly for modal/floating overlays. Trust through clarity, not depth.

## Structural Zones

| Zone    | Treatment                                  | Border              | Notes                                 |
| ------- | ------------------------------------------ | ------------------- | ------------------------------------- |
| Header  | bg-card with `border-b border-border`     | subtle cool line    | Navigation + user profile            |
| Sidebar | bg-sidebar with `border-r border-border`  | cool divider        | Fund categories, role nav            |
| Content | bg-background, alternating bg-muted/5     | —                   | Dashboard grids; compact data tables |
| Footer  | bg-muted/5 with `border-t border-border`  | subtle cool line    | Legal, support links                |

## Spacing & Rhythm

Compact density for data: 16px section gaps (md:24px), 8px card padding, 4px micro-spacing inside table cells. Breathing room preserved around hero sections and primary CTAs.

## Component Patterns

- Buttons: `bg-primary text-primary-foreground rounded-md px-4 py-2`, hover darkened via opacity
- Cards: `bg-card border border-border rounded-lg p-4 shadow-xs`, stacked in grids
- Data badges: `badge-success` / `badge-warning` / `badge-destructive` for fund status
- Tables: `.data-table` utility class with muted headers, striped rows on hover
- Fund cards: grid layout, NAV/returns/risk arranged horizontally, status badges in top-right

## Motion

- Entrance: fade-in on page load (100ms stagger per card)
- Hover: `transition-smooth` (0.3s easing) for button/card state changes
- Decorative: gradient text on h1/h2 (static, no animation) for premium feel

## Constraints

- No full-page gradients or decorative backgrounds
- Shadows never exceed `shadow-elevated` (8px); no glows or neon effects
- Data visualization colors must match chart-1 through chart-5 OKLCH tokens
- Font weights: Regular (400) body, SemiBold (600) labels, Bold (700) headings only
- Responsive breakpoints: mobile-first, optimize for 375px, 768px, 1440px viewports

## Signature Detail

Subtle gradient text on primary headings (`text-gradient-primary` utility) transitioning from deep ocean primary to cool teal accent — signals premium, data-forward experience without distraction.


