---
name: Obsidian Workspace
colors:
  surface: '#121314'
  surface-dim: '#121314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1d'
  surface-container: '#1f2021'
  surface-container-high: '#292a2b'
  surface-container-highest: '#343536'
  on-surface: '#e3e2e3'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e3e2e3'
  inverse-on-surface: '#303031'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#bec7d2'
  on-secondary: '#29313a'
  secondary-container: '#414a53'
  on-secondary-container: '#b0b9c4'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00b982'
  on-tertiary-container: '#00422c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#dae3ee'
  secondary-fixed-dim: '#bec7d2'
  on-secondary-fixed: '#141c24'
  on-secondary-fixed-variant: '#3f4850'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#121314'
  on-background: '#e3e2e3'
  surface-variant: '#343536'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  metadata-label:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.04em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-mobile: 0.5rem
  margin: 1rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system embodies an ultra-restrained, utilitarian aesthetic inspired by modern high-performance engineering tools (Linear, Raycast, VS Code). It caters to technical leads, architects, and product engineers who value density, razor-sharp visual clarity, and disciplined craft over decoration.

The design philosophy adheres to strict structural minimalism:
- **Zero Decorative Noise:** Strictly no blurred glass, gradient sweeps, skeuomorphic noise, or organic 3D shapes.
- **IDE Structural Discipline:** UI surfaces behave like high-density operational panels, command bars, and split-pane viewports.
- **Architectural Precision:** Visual order is achieved exclusively through meticulous 1px hairline borders, muted tonal shifts across dark surfaces, and strict mathematical alignment.
- **Single-Viewport Ergonomics:** The desktop interface functions as an integrated, non-scrolling instrument workspace where panels dock, toggle, and display data within a locked viewport frame.

## Colors

The palette is monochromatic, dark, and highly tactical. Contrast is curated to eliminate eye strain during sustained viewing while maintaining immediate typographic legibility.

### Surface System
- **Canvas Base (`#0c0d0e`):** Root viewport background behind docked containers.
- **Surface Level 1 (`#131517`):** Primary structural frames, editor gutters, and sidebar panels.
- **Surface Level 2 (`#181a1d`):** Elevated cards, active editor tabs, and interactive tile bodies.
- **Surface Level 3 (`#1e2124`):** Hover states, popovers, dropdown menus, and command-palette overlays.

### Hairline Borders
- **Border Default (`#22252a`):** Standard panel separation and internal structural grids (1px solid).
- **Border Subtle (`#272a30`):** Interactive card borders, tab boundaries, and input outlines.
- **Border Active (`#3e4451`):** Focused states and keyboard-selected structural nodes.

### Typographic Tones
- **Text Primary (`#ededed`):** Crisp off-white for primary headlines, active labels, and code tokens.
- **Text Secondary (`#8b949e`):** Muted slate for body descriptions, inactive tab headers, and file paths.
- **Text Tertiary (`#6e7681`):** Subdued gray for line numbers, timestamps, and structural metadata.

### Accent System (Precision Application)
- **Signal Accent (`#10b981` / `#34d399`):** Reserved strictly for functional states—live deployment indicators, git diff additions, active runtime badges, and cursor carets. It must never be used as large graphic fills or prominent header text.

## Typography

The typographic hierarchy pairs high-clarity sans-serif for reading comprehension with an authentic engineering monospace for technical contextualization.

- **Inter:** Drives primary content delivery, project case studies, and primary interface commands. Tracking is slightly tightened (`-0.01em` to `-0.025em`) to retain structural compactness.
- **JetBrains Mono:** Manages all environmental indicators, code snippets, git hashes, technology tags, status counters, and status-bar diagnostics. Features tabular numeric sizing (`font-variant-numeric: tabular-nums`) to maintain vertical alignment across columns.
- **Hierarchy Rules:** All metadata tags and status indicators must use `uppercase` when rendered in `metadata-label`. Code blocks and inline commands must strictly render in `code-md` or `code-sm`.

## Layout & Spacing

The layout is built for density and programmatic efficiency, adhering to a 4px horizontal and vertical baseline.

### Desktop Viewport Architecture (100vh Locked)
- Designed to fit standard desktop viewports (1440x900 and above) without root document scrolling (`overflow: hidden` on viewport root).
- The canvas uses an explicit multi-pane layout:
  1. **Top Status / Command Header:** Fixed height of 36px or 40px.
  2. **Primary Work Area:** A 12-column grid splitting sidebar navigation (2-3 columns), primary workspace buffer (5-6 columns), and contextual inspector panel (3-4 columns).
  3. **Bottom Telemetry Bar:** Fixed height of 24px displaying build versions, git branch status, and active system health.
- Internal scrolling is restricted strictly to designated sub-panes (e.g., project preview scroll areas or terminal readouts) using custom slim scrollbars.

### Responsive Breakdown
- **Desktop (>=1024px):** Fixed-viewport three-pane or two-pane split with 1px border dividers.
- **Tablet / Small Desktop (768px - 1023px):** Collapsible sidebar layout with tabbed pane navigation; inner panes retain vertical scrolling.
- **Mobile (<768px):** Viewport lock releases to an app-like stacked layout with a sticky top directory switcher and fixed bottom status dock.

## Elevation & Depth

Visual hierarchy is constructed entirely through flat surface luminance and 1px structural boundaries. 

- **No Drop Shadows:** Default surfaces, cards, tabs, and list items have `box-shadow: none`.
- **Tonal Stepping:** Surfaces establish visual elevation purely by incrementing surface lightness:
  - Base canvas: `#0c0d0e`
  - Docked container: `#131517`
  - Sub-card or inner panel: `#181a1d`
  - Active hover or selected element: `#1e2124`
- **Hairline Outlines:** All panel boundaries, module dividers, and cards use crisp `1px solid #22252a`. No thick or double borders are permitted.
- **Floating Overlays (Exceptions):** Quick-switcher command palettes (Raycast-style) and context menus use a dark elevation overlay with a subtle, non-colored edge glow:
  - Border: `1px solid #272a30`
  - Shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.8)`

## Shapes

The design language favors crisp, low-radius geometry to reinforce structural discipline.

- **Base Radius (0.25rem / 4px):** Applied to buttons, tech tags, inputs, list row hovers, and status badges.
- **Panel & Card Radius (0.375rem - 0.5rem / 6px - 8px):** Applied to primary outer docked frames and modal dialogs.
- **Indicators:** System status dots and activity pulses use absolute circles (`border-radius: 9999px`).
- **No Large Curvatures:** Pill-shaped buttons and heavily rounded floating surfaces are strictly prohibited.

## Components

### Buttons & Command Triggers
- **Primary Action:** Background `#181a1d`, border `1px solid #272a30`, text `#ededed`. Hover: background `#1e2124`, border `#3e4451`.
- **Ghost / Tool Button:** Background `transparent`, border `1px solid transparent`, text `#8b949e`. Hover: background `#181a1d`, text `#ededed`.
- **Typography:** `JetBrains Mono` or `Inter`, size `0.8125rem`, height `32px`, horizontal padding `0.75rem`.

### Editor Tabs & Directory Trees
- **Tabs:** Height 36px, `1px solid #22252a` divider on right. Active tab: background `#181a1d`, text `#ededed`, top accent border `2px solid #10b981`. Inactive tab: background `#131517`, text `#6e7681`.
- **Directory Tree Item:** Single-line height 28px, monospace file icons, indent 12px per hierarchy level. Active selection: background `#181a1d` with left marker in `#10b981`.

### Technical Badges & Tags
- **Appearance:** Background `#131517`, border `1px solid #22252a`, text `#8b949e`, font `JetBrains Mono` at `0.6875rem`.
- **Status Indicator Badge:** Includes a 6px circular dot with `#10b981` solid fill (with an optional static 1px ring of `rgba(16, 185, 129, 0.2)`).

### Cards & Project Panels
- **Container:** Background `#181a1d`, border `1px solid #22252a`, radius `6px`.
- **Header:** Integrated title row separated by `1px solid #22252a` with filename or project slug in `JetBrains Mono` and metadata aligned right.
- **Hover Behavior:** Border transitions from `#22252a` to `#272a30`. No scale transforms or vertical lift.

### Input Fields & Terminal Prompts
- **Field:** Background `#0c0d0e`, border `1px solid #22252a`, text `#ededed`, placeholder `#6e7681`. Focus: border `1px solid #10b981`, no outer glow.
- **Command Palette Input:** Monospaced prefix prompt (`>`), borderless container floating above a hair-lined command list with keyboard shortcut hints (`⌘K`, `ESC`).

### Lists & Activity Feeds
- **Row:** Height 36px to 44px, border-bottom `1px solid #181a1d`. Content arranged horizontally: status indicator, primary label (`Inter`), parameter or commit hash (`JetBrains Mono`), and timestamp right-aligned in `#6e7681`.