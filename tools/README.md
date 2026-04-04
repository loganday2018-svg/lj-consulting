# Day Horrigan — Pitch Deck System

## What this is

A plug-and-play system for generating bespoke pitch decks for PE firms. Each deck is tailored to a specific firm — their colors, logo, and 3 of their actual portfolio companies with specific AI use case questions. The goal is to make cold outreach feel like "we did our homework on you."

## What exists

### Deck Generator
- `generate_deck.py` — Python script that takes a JSON config and outputs a branded 10-slide PowerPoint
- `pitch_deck_template.py` — The original Natural Capital deck (hardcoded). Use as reference for the full slide-by-slide logic.

### Firm Configs
- `firms/natural_capital.json` — First deck built. Completed 2026-04-01.
- `firms/great_range_capital.json` — Second deck. Completed 2026-04-01.

### Assets
- `assets/` — All logos (firm + portco) and the dot grid texture. PNGs only (pptx doesn't support webp/svg).
- Firm logos: `nc_logo.png`, `grc_touch.png`
- Portco logos: `dispatch_webclip.png`, `vip_logo.png`, `harvest_logo.png`, `fairwave_logo.png`, `ssg_logo.png`, `laborsource_logo.png`
- Texture: `dot_grid.png` (subtle dot grid for dark slide backgrounds)

### Vercel Pages
- `/natural-capital` — Live at dayhorrigan.vercel.app/natural-capital. Source: `app/(marketing)/natural-capital/page.tsx`. Same content as the deck but as a scrollable web page. Includes a PowerPoint download button.
- No Vercel page for Great Range Capital yet.

## How to generate a new deck

### 1. Research the firm
- Find their website, AUM, fund size, investment thesis
- Identify their **operating companies** (skip pure real estate)
- Pick 2-3 portcos where AI use cases are strongest
- Frame use cases as **questions, not assertions** ("How much of X is still manual?" not "We'll automate X")

### 2. Gather assets
- Download firm logo (must be PNG, not SVG/webp — convert with Pillow if needed)
- Download portco logos from their websites or the firm's portfolio page
- Save everything to `assets/`

### 3. Create a JSON config

```json
{
  "firm_name": "Firm Name",
  "accent_color": [r, g, b],
  "light_accent_color": [r, g, b],
  "aum": "$XXM",
  "total_investments": 20,
  "total_invested": "$XXM",
  "logo_path": "assets/firm_logo.png",
  "portcos": [
    {
      "name": "Company Name",
      "subtitle": "What they do • Location",
      "question": "Specific AI-relevant questions about their operations",
      "accent_color": [r, g, b],
      "bg_shade": "dark",
      "logo_path": "assets/company_logo.png",
      "logo_w": 1.5,
      "logo_h": 0.5
    }
  ]
}
```

Key fields:
- `accent_color` / `light_accent_color` — Firm-level brand colors used for accent lines, dividers, highlights. Pull from their website.
- Each portco gets its own `accent_color` for visual differentiation (e.g., blue, teal, amber)
- `bg_shade` — Alternate between `"dark"` (#3A3A3A) and `"light"` (#444444) for visual rhythm
- `logo_w` / `logo_h` — Size in inches. Square logos ~1.0x1.0, wide logos ~2.2x0.5
- `total_invested` can be empty string if unknown

### 4. Generate

```bash
cd ~/Projects/lj-consulting/tools
python3 generate_deck.py --config firms/firm_name.json --output ~/Desktop/LJ_x_FirmName.pptx
```

### 5. Optionally create a Vercel page
- Create `app/(marketing)/firm-name/page.tsx`
- Use the Natural Capital page as a template
- Copy the `.pptx` to `public/` for the download button
- Deploy with `npx vercel --prod`

## Slide structure (10 slides)

1. **Title** — "Day Horrigan" + "Turn AI into EBITDA." + firm logo on dark pill + "Prepared for [Firm]"
2. **Pitch** — "Companies are struggling to realize the full value of AI..."
3. **Big Stat** — "[X] portfolio companies. [$X] invested. How many are using AI beyond chat?"
4. **Divider** — "Your portfolio. Some questions."
5. **Portfolio** — 3 portco cards with logos, colored left borders, alternating backgrounds, and question text
6. **Divider** — "What we've seen."
7. **Randy's Timeline** — Visual timeline: Week 1 → Week 12 showing adoption milestones
8. **Pull Quote** — Full-slide COO quote from Randy's Worldwide
9. **Who We Are** — Logan (Darden MBA, Army Captain, Walmart) + Matt (Darden MBA, Strategy & Finance, WEX)
10. **CTA** — "30 minutes." + logan.day2018@gmail.com + website link + PowerPoint download

## Design decisions

- **Dark theme** with cream accents. Inverted from typical light decks.
- **Dot grid texture** on dark slides for subtle depth
- **Questions, not assertions** for portco use cases — we haven't been inside these companies, so framing as questions is more credible and less presumptuous
- **Honest bios** — We're transparent that this is a side practice from our Walmart roles. "The demand found us" is the framing.
- **No made-up EBITDA projections** — We removed these after reviewing critically. Only include real numbers from actual engagements.
- **Randy's Worldwide is the anchor case study** — COO went from skeptical to self-sufficient in <3 months. Quote: "I am really excited about what I just whipped together."
- **Andres O'Neil & Lowe** (insurance, Ohio) is a second client but too thin for the deck currently — COO trained on Claude Code, rolling out company-wide.

## Backlog

The PE firm outreach backlog lives in Obsidian: `Obsidian Vault/Ventures/AI Consulting/PE Firm Backlog.md`

Current targets:
- NewRoad Capital Partners (Rogers, AR) — supply chain/retail tech portcos
- RZC Investments (Bentonville) — Walton family office, consumer brands
- Diamond State Ventures (Little Rock) — high volume SBIC

## Dependencies

```bash
pip3 install python-pptx Pillow
```

## Contacts

- Logan Day — logan.day2018@gmail.com
- Matt Horrigan — co-founder
- Website: dayhorrigan.vercel.app
