# AFK³ Solutions Website --- Design & Build Specification

**Document purpose:** Primary design and implementation brief for a
coding/design agent building the first public AFK³ Solutions website.

**Brand:** AFK³ Solutions --- Automated Flow Kinetics\
**Working tagline:** **Helping businesses operate while you're AFK.**\
**Primary launch focus:** Custom software, MVP development,
automation/AI, integrations, and technology-enabled operations.\
**Secondary offer:** Managed remote operations/talent.\
**Primary markets:** Australia and the United States, with selective
Philippine opportunities.

------------------------------------------------------------------------

## 1. Website Goal

The website must make AFK³ look like a **credible, modern technology and
operations company**, not a cheap outsourcing/VA agency and not an
overhyped AI startup.

A visitor should understand within roughly 5--10 seconds:

1.  AFK³ builds custom software and automations.
2.  AFK³ can also support or manage operational work when people are
    still needed.
3.  AFK³ focuses on business processes and outcomes, not technology for
    its own sake.
4.  The company is approachable enough for an SME but technically
    capable enough to handle serious projects.
5.  The obvious next action is to discuss a business problem/project.

### Primary conversion

**Discuss a Project / Tell Us What You're Trying to Solve**

### Secondary conversions

-   Explore Services
-   View Work / Capabilities
-   Discuss an MVP
-   Contact AFK³

------------------------------------------------------------------------

# 2. Overall Creative Direction

## Design personality

The site should feel:

-   **Digital**
-   **Professional**
-   **Technical**
-   **Human**
-   **Personal**
-   **Calm**
-   **Confident**
-   **Modern**
-   **Slightly playful**
-   **Not overwhelming**

The visual concept is:

> **Human operations moving through intelligent digital systems.**

AFK³ should sit visually between a premium software studio, a modern B2B
consultancy, and a technology-enabled operations company.

Do **not** make the site look like:

-   a call-center/outsourcing template;
-   a generic AI website covered in glowing robots;
-   a cyberpunk gaming site;
-   a cryptocurrency site;
-   a sterile enterprise consultancy with no personality;
-   a childish cartoon website;
-   a page overloaded with animated particles, gradients, cards, and
    moving objects.

------------------------------------------------------------------------

# 3. Core Visual Concept --- "Living Flow System"

The brand name **Automated Flow Kinetics** gives the website a natural
design language: **flow, movement, connections, handoffs, systems, and
transformation**.

Use a persistent visual vocabulary based on:

-   flowing lines;
-   nodes;
-   connected cards;
-   process paths;
-   pulses moving through paths;
-   small data packets/dots;
-   grids;
-   modular blocks;
-   subtle arrows;
-   workflow diagrams;
-   transformation from messy/manual → organized/automated.

The design should suggest that work continues to move even when the
client is "AFK."

### Signature brand animation

Create a subtle animated **AFK Flow Line** that can recur throughout the
website.

Example:

``` text
REQUEST
   ●───────●────────●────────●
        PROCESS   AUTOMATE   DONE
```

A small light/pulse travels through the line.

This motif can appear in:

-   hero background;
-   section dividers;
-   service cards;
-   process section;
-   CTA;
-   loading states;
-   hover states.

Do not make every line move simultaneously. Motion should feel
intentional.

------------------------------------------------------------------------

# 4. Human + Digital Illustration Direction

AFK³ should not be entirely abstract. Add a small amount of **custom
character illustration** to make the company more personal.

## Recommended style

Use **stylized 2.5D / soft 3D / modern editorial cartoon characters**.

Characters should look like professional people, not children's mascots.

Good qualities:

-   simplified facial features;
-   rounded but not toy-like proportions;
-   modern clothing;
-   laptops/tablets/phones;
-   subtle personality;
-   warm neutral skin/clothing tones against cool digital backgrounds;
-   slightly exaggerated poses;
-   soft lighting;
-   polished 3D or clean vector appearance.

## How much cartoon content?

Use characters in approximately **3--4 important places**, not every
section.

### Suggested appearances

**Hero:**\
One small stylized operator/engineer working beside a floating workflow
system.

**Services:**\
Tiny character accents representing build / automate / operate.

**How We Work:**\
Small scenes showing collaboration between client, AFK³, and system.

**Final CTA:**\
A relaxed character stepping away from a workstation while the workflow
continues moving --- a subtle visual joke around "AFK."

### Important

Do not use a humanoid robot as the brand mascot.

AFK³ is about **humans + systems**, not replacing humans with robots.

------------------------------------------------------------------------

# 5. Optional AFK³ Micro-Mascot

A small non-human digital companion can exist, but it should be subtle.

Concept:

**"Flow"** --- a tiny geometric digital helper built from the AFK³
node/flow visual language.

Possible form:

-   rounded cube/node;
-   small floating orb;
-   two simple expressive eyes;
-   tiny trailing flow line;
-   cyan glow;
-   no detailed humanoid body.

Use Flow for:

-   empty states;
-   small tips;
-   404 page;
-   loading state;
-   contact success screen;
-   occasional section easter egg.

Do not let it dominate the homepage.

------------------------------------------------------------------------

# 6. Color System

Recommended dark-first palette.

``` css
--bg-primary: #080B12;
--bg-secondary: #0D121C;
--surface: #111824;
--surface-raised: #151E2C;

--text-primary: #F5F7FA;
--text-secondary: #AAB5C4;
--text-muted: #738094;

--accent-primary: #36D7FF;
--accent-blue: #4D7CFE;
--accent-violet: #8B6CFF;
--success: #63E6BE;

--border: rgba(255,255,255,0.08);
--glow: rgba(54,215,255,0.18);
```

These are design starting points, not immutable values.

### Accent rule

Cyan/blue is primary.

Violet should be secondary and used sparingly.

Avoid covering every component in gradients.

Use glow primarily to communicate:

-   active flow;
-   selected state;
-   digital connection;
-   important CTA;
-   data movement.

------------------------------------------------------------------------

# 7. Typography

Recommended:

-   **Headings:** Manrope, Geist, General Sans, or similar modern
    geometric sans.
-   **Body/UI:** Inter, Geist, or similar highly readable sans.
-   **Technical labels:** optional mono font such as JetBrains Mono for
    tiny workflow labels only.

### Hierarchy

Hero heading should be large but not absurdly large.

Desktop target:

``` text
Hero H1: 64–80px
Section H2: 40–56px
Card heading: 20–28px
Body: 16–18px
Small labels: 12–14px
```

Mobile should scale naturally using `clamp()`.

Avoid excessive ALL CAPS. Use uppercase mainly for small eyebrow labels.

------------------------------------------------------------------------

# 8. Layout Philosophy

Use a **12-column desktop grid** and generous whitespace.

Maximum content width around:

``` text
1200–1320px
```

Sections should alternate between:

-   large open layouts;
-   controlled card grids;
-   diagram-like visual sections;
-   human illustration moments.

Avoid endless rows of identical cards.

The page should have a visual rhythm:

``` text
CALM → VISUAL → CALM → INTERACTIVE → CALM → PROOF → CTA
```

------------------------------------------------------------------------

# 9. Navigation

Desktop:

``` text
AFK³

Services
Solutions
How We Work
Work
About

[Discuss a Project]
```

Sticky navigation.

At the top of the page it may be transparent.

After scroll:

-   dark translucent surface;
-   backdrop blur;
-   thin border;
-   subtle shadow/glow.

### Services mega/dropdown

``` text
Custom Software
MVP Development
Automation & AI
System Integration
Web Applications
Managed Operations
```

Do not build an enormous mega-menu at V1.

------------------------------------------------------------------------

# 10. Homepage --- Hero

## Copy

**Eyebrow**

``` text
SOFTWARE • AUTOMATION • OPERATIONS
```

**Headline**

# Helping businesses operate while you're AFK.

Alternative supporting emphasis:

> Build better systems. Automate repetitive work. Keep operations
> moving.

**Body**

AFK³ Solutions builds custom software, automates repetitive workflows,
and helps growing businesses operate with the right combination of
technology and people.

**Primary CTA**

`Discuss Your Project`

**Secondary CTA**

`Explore Services`

------------------------------------------------------------------------

# 11. Hero Visual

The hero visual should be one of the strongest original elements of the
site.

Create an interactive **mini digital operation** on the right side.

Example structure:

``` text
                    ┌─────────────┐
   New Request ───▶ │   Intake    │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Workflow   │
                    └──┬──────┬───┘
                       │      │
                 AI ───┘      └── Human
                       │
                       ▼
                    Completed ✓
```

Make this look like a polished product interface rather than ASCII.

### Hero animation

On initial load:

1.  background grid fades in;
2.  headline rises/fades 12--20px;
3.  flow diagram nodes appear sequentially;
4.  one glowing packet travels through the workflow;
5.  completed node gently pulses;
6.  character performs a very small idle animation.

Total initial sequence should be approximately 1--1.5 seconds.

Afterwards only subtle ambient motion remains.

### Cursor interaction

Desktop only:

-   hero glow follows cursor very subtly;
-   nearby flow lines brighten slightly;
-   do not create a distracting spotlight.

Disable/reduce on touch devices.

------------------------------------------------------------------------

# 12. Hero Background

Use multiple subtle layers:

``` text
Layer 1 — near-black/navy base
Layer 2 — very faint technical grid
Layer 3 — blurred cyan/blue radial glow
Layer 4 — sparse flow lines
Layer 5 — occasional tiny node particles
```

Particles should **not** resemble a starfield.

No Matrix rain.

No constant high-speed motion.

------------------------------------------------------------------------

# 13. Trust / Positioning Strip

Immediately after hero:

> **Built for growing businesses that have outgrown manual workflows.**

Optional moving but very slow keyword rail:

``` text
CUSTOM SOFTWARE  •  MVPs  •  AUTOMATION  •  INTEGRATIONS  •  INTERNAL TOOLS  •  MANAGED OPERATIONS
```

Movement must pause on hover and respect reduced-motion preferences.

------------------------------------------------------------------------

# 14. Services Section

Heading:

# One partner for systems, automation, and operations.

Use **three primary service worlds**, not 12 equal cards.

## Card 01 --- Custom Software

Possible sub-services:

-   Internal tools
-   Dashboards
-   Web applications
-   MVP development
-   Business systems

Visual: floating UI panels assembling into one system.

## Card 02 --- Automation & AI

-   Workflow automation
-   AI-assisted processes
-   API integrations
-   Data/report automation
-   System synchronization

Visual: several nodes connected by an animated flow.

## Card 03 --- Managed Operations

-   Administrative operations
-   Customer operations
-   Technical support
-   Specialized remote talent
-   Managed processes

Visual: human operator + system dashboard.

### Card interaction

Hover:

-   card lifts only 2--4px;
-   border becomes slightly brighter;
-   visual animates;
-   tiny flow pulse travels inside card;
-   arrow moves 3--5px.

No dramatic 3D tilt.

------------------------------------------------------------------------

# 15. "Your Business Has Grown" Problem Section

Use a warmer, more human layout.

Headline:

# Your business has grown. Have your systems grown with it?

Show six operational problems:

``` text
Manual reporting
Spreadsheet-heavy operations
Repeated data entry
Disconnected systems
Email/chat approvals
Administrative bottlenecks
```

### Interaction idea

Each problem begins as a slightly messy floating item.

As it enters the viewport, lines subtly organize them into a clean
workflow.

This visually communicates AFK³'s value without needing a long
explanation.

------------------------------------------------------------------------

# 16. Signature AFK³ Model

This should be one of the most distinctive sections.

Headline:

# We don't start with technology. We start with how the work moves.

Interactive visual:

``` text
PEOPLE
   ↓
PROCESS KNOWLEDGE
   ↓
AUTOMATION
   ↓
MANAGED OUTCOME
   ↓
SOFTWARE PRODUCT
```

The actual AFK³ model can be presented horizontally on desktop and
vertically on mobile.

As the visitor scrolls, a single illuminated line progresses through the
stages.

Clicking/hovering each stage opens a short explanation.

This section visually connects **all AFK³ services** without making the
company feel unfocused.

------------------------------------------------------------------------

# 17. Software-Focused Section

Because software is the initial acquisition priority, give it extra
visual weight.

Heading:

# Software built around the way your business actually works.

Body:

Your business should not have to reshape itself around disconnected
spreadsheets and generic tools. AFK³ designs practical software around
the workflows that matter to your operation.

Use a bento-style layout:

``` text
┌───────────────────────┬──────────────┐
│ INTERNAL TOOLS        │ DASHBOARDS   │
│                       │              │
├───────────┬───────────┴──────────────┤
│ MVPs      │ SYSTEM INTEGRATIONS      │
├───────────┴───────────┬──────────────┤
│ WEB APPLICATIONS      │ WORKFLOWS    │
└───────────────────────┴──────────────┘
```

Each tile gets a unique micro-visual.

------------------------------------------------------------------------

# 18. Interactive Before / After Workflow

Optional but highly recommended.

Create a draggable or click-toggle comparison:

## BEFORE AFK³

``` text
Email
  ↓
Spreadsheet → Copy/Paste → Another System
  ↓                         ↓
Manual Report ← More Copy/Paste
```

## AFTER AFK³

``` text
Request
   ↓
Unified Workflow
 ├─ Automation
 ├─ Human Review
 └─ Reporting
   ↓
Outcome
```

Do not imply every business will receive the exact same solution.

Label it clearly as an illustrative workflow.

------------------------------------------------------------------------

# 19. MVP Section

Use a visually separate section.

Eyebrow:

`START SMALL. PROVE THE CORE WORKFLOW.`

Heading:

# Have an idea? Start with an MVP.

Explain:

-   lower initial commitment;
-   validate core workflow;
-   get real user feedback;
-   reduce requirement uncertainty;
-   establish a foundation for Phase 2.

CTA:

`Discuss an MVP`

### Visual

Show a product evolving through three stages:

``` text
Idea → MVP → Expanded Product
```

Animate the middle MVP stage into focus.

------------------------------------------------------------------------

# 20. How We Work

Heading:

# From messy process to working system.

Six steps:

``` text
01 Understand
02 Design
03 Build
04 Validate
05 Launch
06 Improve
```

### Animation

Use one continuous path connecting all six.

As each step enters the viewport:

-   node activates;
-   number brightens;
-   short description fades in;
-   line fills toward the next node.

On mobile, use a vertical timeline.

------------------------------------------------------------------------

# 21. Work / Case Studies

Initially distinguish between:

**AFK³ Client Work**

and

**Founder / Team Experience**

Never imply that historical personal/employment projects were delivered
commercially by AFK³ if they were not.

Possible initial cards:

-   Operations Management Platform
-   AI Voice & Location Agent
-   Workflow Automation System
-   Internal ERP / CRM concepts

Each case study should eventually contain:

``` text
Problem
Context
Approach
What Was Built
Technology
Outcome
Lessons
```

Only use client names, screenshots, or confidential metrics when
permitted.

------------------------------------------------------------------------

# 22. Founder / Human Section

AFK³ should feel like there are real people behind the systems.

Heading:

# Technology built with operational context.

Keep founder copy concise.

Focus on:

-   engineering;
-   software development;
-   automation;
-   real operational management;
-   understanding workflows from both technical and business sides.

Do not turn the homepage into a personal portfolio.

### Visual

Option A: professional founder portrait later.

Option B: custom illustrated founder avatar at launch.

Option C: stylized desk/workspace scene with engineering + software
details.

------------------------------------------------------------------------

# 23. Technology Section

Place this below business-value sections.

Heading:

# Technology chosen for the problem.

Example capability chips:

``` text
Python
TypeScript
React / Next.js
APIs
SQL
AI Integrations
Automation
Cloud
Docker
Web Applications
```

Do not make this a wall of 40 logos.

Animate chips only slightly on hover.

------------------------------------------------------------------------

# 24. Why AFK³

Four main reasons:

## Business-first

Start with the workflow and desired outcome.

## Flexible delivery

Discovery, focused project, MVP, automation, or managed engagement.

## Built to expand

Add modules, integrations, automation, support, or later phases.

## Technical + Operational

Software and operational understanding can exist under one relationship.

------------------------------------------------------------------------

# 25. Contact / Project Inquiry

Heading:

# What is slowing your business down?

Supporting copy:

Tell us how the process works today. We'll help determine what should
happen next.

### Fields

``` text
Name *
Business Email *
Company *
Company Website
Country

What do you need?
[ Custom Software ]
[ MVP Development ]
[ Automation / AI ]
[ System Integration ]
[ Web Application ]
[ Managed Operations ]
[ Remote Talent ]
[ Not Sure Yet ]

Tell us about the problem *

How do you handle it today?

Target timeline
[ ASAP ]
[ 1–2 months ]
[ 3–6 months ]
[ Exploring ]

Approximate budget
[ Prefer not to say ]
[ Under $2,500 ]
[ $2,500–$5,000 ]
[ $5,000–$12,000 ]
[ $12,000–$25,000 ]
[ $25,000+ ]

[ Submit Project Inquiry ]
```

Do not make the budget field mandatory for V1.

### Success state

After submit, show a small Flow mascot / moving node completing a path:

> **Received. We'll review the problem and determine the right next
> step.**

Eventually send the submission directly to the AFK³ CRM.

------------------------------------------------------------------------

# 26. Footer

Include:

``` text
AFK³ Solutions
Automated Flow Kinetics

Helping businesses operate while you're AFK.

Services
Solutions
How We Work
Work
About
Contact

Privacy
Terms

LinkedIn
Business Email
```

Optional small animated line:

``` text
●────────────●────────────●
```

Pulse slowly once every several seconds.

------------------------------------------------------------------------

# 27. Motion Design System

Motion is important, but **restraint is mandatory**.

## Animation hierarchy

### Level 1 --- Functional motion

Used for:

-   buttons;
-   menus;
-   accordions;
-   forms;
-   tabs;
-   feedback states.

Duration:

``` text
120–250ms
```

### Level 2 --- Section entrance

Used for:

-   heading;
-   cards;
-   diagrams;
-   images.

Duration:

``` text
400–700ms
```

Typical transform:

``` text
opacity: 0 → 1
translateY: 12–24px → 0
```

### Level 3 --- Ambient brand motion

Used for:

-   flow pulses;
-   floating character;
-   background lines;
-   glows.

Very slow:

``` text
4–12 seconds
```

Ambient animations should not demand attention.

------------------------------------------------------------------------

# 28. Scroll Effects

Recommended:

-   gentle section reveals;
-   progressive workflow line drawing;
-   subtle parallax on large decorative objects;
-   sticky storytelling for the AFK³ model;
-   number/step activation;
-   diagram transformations.

Avoid:

-   aggressive scroll hijacking;
-   sections snapping unexpectedly;
-   huge zoom effects;
-   constant horizontal scroll;
-   text flying from every direction.

Normal scrolling must remain comfortable.

------------------------------------------------------------------------

# 29. Button Effects

Primary button:

-   cyan/blue accent;
-   subtle inner highlight;
-   slight glow;
-   arrow icon.

Hover:

``` text
translateY(-1px)
glow increases slightly
arrow translateX(3px)
```

Click:

``` text
scale(0.98)
```

Secondary button:

-   transparent/dark;
-   thin border;
-   brighter border on hover.

------------------------------------------------------------------------

# 30. Cursor Effects

Desktop only.

Optional custom effect:

-   standard cursor remains visible;
-   nearby interactive nodes respond to pointer;
-   faint radial light follows cursor inside hero/diagram areas only.

Do **not** replace the browser cursor with a giant custom circle across
the entire site.

------------------------------------------------------------------------

# 31. Card Effects

Cards can use a restrained glass/digital treatment:

``` css
background: rgba(...);
border: 1px solid rgba(255,255,255,.08);
backdrop-filter: blur(...);
```

But do not make every section glassmorphic.

Use solid dark surfaces for most content and glass effects only where
they reinforce digital depth.

------------------------------------------------------------------------

# 32. Digital Details

Small details that can make the site feel custom:

-   animated status dots;
-   tiny labels such as `WORKFLOW ACTIVE`;
-   moving data packet on connector lines;
-   grid coordinates;
-   micro timestamps;
-   terminal-style labels used sparingly;
-   tiny process IDs such as `AFK-FLOW-01`;
-   line endpoints that activate on hover;
-   cards visually "connecting" when related;
-   small waveform/pulse indicators;
-   subtle noise texture;
-   blurred light pools.

Avoid meaningless fake technical numbers everywhere.

------------------------------------------------------------------------

# 33. Easter Eggs / Personality

AFK³ can have personality without losing professionalism.

Examples:

### AFK mode

A tiny toggle or footer easter egg:

`Go AFK`

When clicked:

-   character leaves desk;
-   workflow keeps running;
-   tiny message appears:

> Still moving.

Do not change the whole website or interfere with navigation.

### Logo interaction

Hovering the superscript `³` could activate three small connected nodes.

### 404 page

> **Looks like this workflow went off-path.**

Flow mascot reconnects a broken line.

Button:

`Return to Home`

------------------------------------------------------------------------

# 34. Accessibility

All effects must support:

``` css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

-   remove parallax;
-   stop continuous ambient animation;
-   show final workflow states immediately;
-   preserve functional state transitions.

Also require:

-   WCAG-friendly contrast;
-   visible keyboard focus;
-   semantic HTML;
-   proper labels;
-   keyboard-operable menus;
-   alt text;
-   no information communicated by animation/color alone.

------------------------------------------------------------------------

# 35. Performance

The website sells technical competence. Poor performance damages
credibility.

Targets:

-   Lighthouse Performance: ideally 90+
-   Accessibility: 95+
-   Best Practices: 95+
-   SEO: 95+
-   avoid layout shift;
-   lazy-load noncritical illustrations;
-   use SVG/WebP/AVIF;
-   avoid giant background video;
-   avoid unnecessarily large animation libraries.

Use CSS/SVG animation when practical.

Use Framer Motion / Motion only for interactions that genuinely benefit
from it.

Use Lottie/Rive only for selected character/illustration animations.

------------------------------------------------------------------------

# 36. Responsive Behavior

The site must be designed mobile-first, not merely compressed from
desktop.

On mobile:

-   hero becomes single column;
-   workflow visual appears below copy;
-   reduce ambient particles;
-   disable cursor effects;
-   verticalize process diagrams;
-   bento grids become stacked cards;
-   keep CTA easily reachable;
-   navigation becomes compact drawer;
-   illustrations remain secondary to readability.

Do not hide important business content just to simplify mobile.

------------------------------------------------------------------------

# 37. Recommended Technical Stack

Suggested implementation:

``` text
Next.js
TypeScript
React
Tailwind CSS
Framer Motion / Motion
Lucide icons
SVG for custom diagrams
Rive or Lottie only for selected illustrations
React Hook Form + schema validation
Analytics
SEO metadata / OpenGraph
```

Possible later integrations:

``` text
AFK³ CRM
Email notifications
Lead scoring
Calendar booking
CMS for case studies/articles
Client portal
```

------------------------------------------------------------------------

# 38. Site Architecture --- V1

``` text
/
├── services
│   ├── custom-software
│   ├── mvp-development
│   ├── automation-ai
│   ├── integrations
│   └── managed-operations
│
├── solutions
│   ├── internal-tools
│   ├── workflow-automation
│   └── web-applications
│
├── how-we-work
├── work
├── about
├── contact
├── privacy
└── terms
```

V1 can launch with fewer fully separate pages if needed, but routes
should be planned for expansion.

------------------------------------------------------------------------

# 39. Homepage Structure --- Final Recommended Order

``` text
NAV

01 HERO
   Helping businesses operate while you're AFK.
   + interactive workflow illustration

02 POSITIONING STRIP
   Built for businesses that have outgrown manual workflows.

03 SERVICES
   Software / Automation / Managed Operations

04 BUSINESS PROBLEM
   Your business has grown. Have your systems grown with it?

05 AFK³ MODEL
   People → Process Knowledge → Automation → Managed Outcome → Software

06 SOFTWARE CAPABILITIES
   Bento grid

07 BEFORE / AFTER WORKFLOW
   Illustrative transformation

08 MVP
   Idea → MVP → Expansion

09 HOW WE WORK
   Understand → Design → Build → Validate → Launch → Improve

10 SELECTED WORK
   AFK³ work + clearly labeled founder/team experience

11 WHY AFK³
   Four differentiators

12 TECHNOLOGY
   Small capability section

13 HUMAN / FOUNDER
   Brief credibility section

14 PROJECT INQUIRY CTA

15 FOOTER
```

------------------------------------------------------------------------

# 40. Reference Image / Moodboard Direction

The coding/design agent should **use references for visual direction
only, not copy layouts or artwork**.

## Reference A --- Human + digital

Look for modern dark software-agency designs using **professional 3D
illustrated people**. The useful idea is the contrast between a dark
technical interface and warm human characters.

Use this for:

-   character proportion;
-   warmth;
-   approachable hero;
-   humanizing technical services.

## Reference B --- Network / flow consultancy

Look for dark consulting layouts with **connected node/globe/network
graphics**.

Use this for:

-   AFK³ flow language;
-   thin network lines;
-   restrained cyan glow;
-   technical credibility.

## Reference C --- Dark futuristic consulting

Look for dark AI/technology consulting designs using:

-   near-black surfaces;
-   blue/violet accents;
-   large typography;
-   restrained glow;
-   geometric diagrams.

Use this for overall visual polish, but make AFK³ less cyberpunk and
more human.

## Reference D --- Bright 3D character SaaS

Look at modern SaaS sites using colorful 3D characters and floating UI
elements.

Use only the **playfulness and character treatment**. Do not copy the
bright pastel overall palette.

------------------------------------------------------------------------

# 41. Image Generation Briefs

If custom illustrations are generated, keep the style consistent across
all assets.

## Hero illustration prompt concept

> Professional stylized 2.5D/3D digital illustration for a modern B2B
> software and automation company. A friendly engineer/operator works at
> a clean workstation while translucent workflow cards, connected nodes,
> dashboards and data paths move around them. Dark navy environment,
> restrained cyan and blue glow, small violet accents, warm human tones,
> premium technology consultancy aesthetic, approachable but
> professional, clean composition, no humanoid robots, no cyberpunk
> clutter, transparent or dark-compatible background.

## Managed operations illustration

> Small professional team collaborating around a digital workflow
> dashboard, modern stylized 3D editorial characters, business casual
> clothing, connected task cards and automation nodes, dark navy and
> cyan technology aesthetic, human-centered, premium B2B, clean
> background.

## "Go AFK" illustration

> Friendly professional character calmly stepping away from a
> workstation while a connected digital workflow continues processing
> tasks behind them, subtle humor, modern polished 3D editorial
> illustration, dark navy technology environment, cyan flow lines,
> professional rather than childish.

## Flow mascot

> Minimal floating geometric digital companion made from a rounded
> node/cube with two subtle expressive eyes and a short glowing
> flow-line tail, cyan/blue light, premium SaaS aesthetic, simple enough
> to work at 32px, no humanoid body, no robot cliché.

------------------------------------------------------------------------

# 42. Important Brand Rules for the Coding Agent

1.  **Business outcome first, technology second.**
2.  Do not market AFK³ primarily as a VA company.
3.  Software and automation receive the strongest homepage emphasis at
    launch.
4.  Managed operations remains visible because it is part of the larger
    AFK³ model.
5.  Never invent client counts, revenue, testimonials, certifications,
    or results.
6.  Clearly label founder/team experience separately from AFK³ client
    work.
7.  Do not publish exact project pricing unless specifically approved.
8.  Do not claim every manual process should be automated.
9.  Avoid generic AI buzzwords.
10. Avoid robot imagery as the main visual metaphor.
11. Keep animation subtle and purposeful.
12. Every major visual should support the idea of **work flowing through
    a better system**.
13. The site must still look excellent with animation disabled.
14. The visual design should be distinctive enough that a visitor can
    remember "the company with the flowing system / AFK concept."
15. The final result should feel credible to a 10--50 employee
    Australian or US business owner/operations manager.

------------------------------------------------------------------------

# 43. Definition of Done

The V1 website is ready when:

-   the value proposition is understandable in under 10 seconds;
-   custom software and automation are clearly the primary launch
    offers;
-   managed operations is understandable without making AFK³ look like a
    low-cost staffing agency;
-   the site has a recognizable AFK³ visual language;
-   there is at least one memorable interactive workflow visual;
-   character art humanizes the brand without making it childish;
-   animations are smooth but restrained;
-   mobile is intentionally designed;
-   accessibility/reduced-motion behavior works;
-   project inquiry works;
-   metadata/SEO/OpenGraph are configured;
-   no fake social proof is present;
-   performance is strong;
-   the site can expand later into case studies, articles, client
    portal, CRM integration, and additional services.

------------------------------------------------------------------------

# 44. One-Sentence Creative Brief

> **Design AFK³ as a human-centered digital operations company where
> people, software, and automation visibly flow together --- premium and
> technical enough to earn B2B trust, personal enough to feel
> approachable, and playful enough to make "Helping businesses operate
> while you're AFK" memorable.**
