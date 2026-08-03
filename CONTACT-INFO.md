# Contact Info & Placeholders — All Locations

Every piece of contact info, social link, and placeholder in the site with the exact file and line number.
Use Cmd+click on the file paths in your IDE to jump straight to the line.

---

## Email address (`txcspack351@gmail.com`)

| File | Line | Context |
|---|---|---|
| [site/src/components/SiteFooter.jsx](site/src/components/SiteFooter.jsx#L44) | 44–45 | Footer "Contact" column — displayed as a clickable email link |
| [site/src/pages/JoinPage.jsx](site/src/pages/JoinPage.jsx#L6) | 6 | `CONTACT_EMAIL` — feeds the prefilled `mailto:` link that replaced the old join form |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L148) | 148 | Links section — "email us and we'll send it over" note |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L256) | 256 | FAQ section — "Email Cubmaster" button |
| [site/src/pages/EventsPage.jsx](site/src/pages/EventsPage.jsx#L97) | 97 | Note under the year list — "email us and we'll keep you in the loop" |

**To change:** find-and-replace the address across the whole `site/src/` folder.

> Changed from `nickagnos@gmail.com` to the Pack address `txcspack351@gmail.com` on 2026-08-03.

---

## Facebook Group URL (`https://www.facebook.com/groups/351cubscouts`)

| File | Line | Context |
|---|---|---|
| [site/src/components/SiteFooter.jsx](site/src/components/SiteFooter.jsx#L49) | 49 | Footer "Contact" column — clickable "Facebook Group" link |

**To change:** update the `href` on line 49 of SiteFooter.jsx.

---

## Leader name placeholders (`[Name]`)

| File | Line | Context |
|---|---|---|
| [site/src/pages/AboutPage.jsx](site/src/pages/AboutPage.jsx#L126) | 126 | Rendered once per leader card — 4 cards total (Cubmaster, Asst. Cubmaster, Pack Treasurer, Outdoor Chair) |

**To change:** the leaders array is defined at lines 15–20. Add a `name` field there, then replace `[Name]` on line 126 with `{leader.name}`.

---

## Meeting time (`6:30 – 7:30 PM`, `Most Mondays`)

| File | Line | Context |
|---|---|---|
| [site/src/components/SiteFooter.jsx](site/src/components/SiteFooter.jsx#L33) | 33–36 | Footer "Meetings" column |
| [site/src/pages/HomePage.jsx](site/src/pages/HomePage.jsx#L101) | 101 | Quick facts bar on homepage |
| [site/src/pages/JoinPage.jsx](site/src/pages/JoinPage.jsx#L155) | 155 | Join page sidebar FAQ card |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L68) | 68 | Resources → New Families → Step 1 |

---

## Meeting location (`Central Baptist Church, Lindale, TX`)

| File | Line | Context |
|---|---|---|
| [site/src/components/SiteFooter.jsx](site/src/components/SiteFooter.jsx#L36) | 36–37 | Footer "Meetings" column |
| [site/src/pages/HomePage.jsx](site/src/pages/HomePage.jsx#L102) | 102 | Quick facts bar |
| [site/src/pages/HomePage.jsx](site/src/pages/HomePage.jsx#L124) | 124–127 | Upcoming events list (location field) |
| [site/src/pages/EventsPage.jsx](site/src/pages/EventsPage.jsx#L8) | 8–17 | Full events list (location field, multiple rows) |
| [site/src/pages/AboutPage.jsx](site/src/pages/AboutPage.jsx#L36) | 36 | About page hero paragraph |
| [site/src/pages/AboutPage.jsx](site/src/pages/AboutPage.jsx#L63) | 63 | "Our story" section |
| [site/src/pages/AboutPage.jsx](site/src/pages/AboutPage.jsx#L139) | 139 | Charter org strip |
| [site/src/pages/JoinPage.jsx](site/src/pages/JoinPage.jsx#L155) | 155 | Join sidebar FAQ card |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L68) | 68 | New Families → Step 1 |

---

## Annual cost (`$175 / year`)

| File | Line | Context |
|---|---|---|
| [site/src/pages/HomePage.jsx](site/src/pages/HomePage.jsx#L103) | 103 | Quick facts bar |
| [site/src/pages/JoinPage.jsx](site/src/pages/JoinPage.jsx#L152) | 152 | Join sidebar FAQ card |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L55) | 55 | Resources FAQ answer |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L69) | 69 | New Families → Step 2 |

---

## Charter year / pack history

| File | Line | Context |
|---|---|---|
| [site/src/pages/AboutPage.jsx](site/src/pages/AboutPage.jsx#L63) | 63 | "Pack 351 has been part of the Lindale community **for years**" — replace with actual charter year |
| [site/src/components/SiteFooter.jsx](site/src/components/SiteFooter.jsx#L66) | 66 | `© 2026 Pack 351` — update year if needed |

---

## External links (BSA / third-party)

| File | Line | URL | Notes |
|---|---|---|---|
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L14) | 14 | `https://filestore.scouting.org/…/680-001_AB.pdf` | BSA Health Form A&B — official link, no change needed |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L19) | 19 | `https://filestore.scouting.org/…/680-001_C.pdf` | BSA Health Form C — official link, no change needed |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L69) | 69 | `BeAScout.org` | Plain text reference, not a link |
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L70) | 70 | `ScoutShop.org` | Plain text reference, not a link |

---

## Pack-specific PDFs (currently show as disabled download buttons)

These 6 forms have `href: null` and display as dimmed buttons until you upload the PDFs:

| File | Lines | Form name |
|---|---|---|
| [site/src/pages/ResourcesPage.jsx](site/src/pages/ResourcesPage.jsx#L21) | 21–46 | Activity Permission Slip, Talent Release, Scholarship Request, Pinewood Derby Rules, Raingutter Regatta Rules, Packing Checklist |

**To add a PDF:** upload the file to `site/public/` (e.g. `site/public/permission.pdf`), then change `href: null` to `href: '/permission.pdf'` for that entry.
