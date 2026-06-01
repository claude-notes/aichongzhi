# GEO Analysis

Date: 2026-06-01

## GEO Readiness Score

Score: 82/100

- Google AI Overviews: 84/100
- ChatGPT Search: 78/100
- Perplexity: 76/100

## AI Crawler Access

`robots.txt` allows the main AI search crawlers used for GEO visibility:

- GPTBot: allowed
- OAI-SearchBot: allowed
- ChatGPT-User: allowed
- ClaudeBot: allowed
- PerplexityBot: allowed

## llms.txt Status

`llms.txt` is present and includes:

- Core pages: homepage, guide, FAQ
- Key facts for ChatGPT/GPT, Claude Pro, Grok/SuperGrok, Gemini Advanced
- Search intents served
- Contact and trust notes with WeChat contact and update date

## Passage-Level Citability

Strong citation blocks now exist on:

- `index.html`: "不知道 GPT、Claude、Grok、Gemini 怎么升级？"
- `guide.html`: "自助代充/升级步骤"
- `faq.html`: first FAQ answer for users who do not know which upgrade path to choose

These blocks are self-contained, include direct answers early, and map to high-intent queries such as `GPT怎么升级`, `ChatGPT代充升级`, `Claude怎么升级`, `Grok怎么充值`, and `Gemini怎么升级`.

## Structural Readability

The visible heading hierarchy is clean:

- `index.html`: one H1, seven visible H2 sections
- `guide.html`: one H1, four H2 sections
- `faq.html`: one H1, one H2 FAQ section

Hidden modal titles were changed from `h2` to styled `p.modal-title` elements so AI crawlers do not confuse modal copy with the primary page outline.

## Server-Side Rendering Check

The key SEO/GEO content is static HTML and does not require JavaScript execution. This is good for AI crawlers because many AI crawlers do not execute client-side JavaScript.

## Schema Status

Current structured data:

- `index.html`: Organization, WebSite, WebPage, Service, BreadcrumbList, FAQPage
- `guide.html`: WebSite, WebPage, BreadcrumbList
- `faq.html`: WebSite, FAQPage

JSON-LD parsing passes locally.

## Remaining High-Impact Items

1. Build external brand signals on platforms AI engines commonly cite, such as YouTube, Reddit, and relevant community posts.
2. Add original data or service comparison notes that are not duplicated elsewhere, improving passage-level citability.
3. Add a persistent update policy or author/service owner note if stronger trust signaling is needed.
4. Submit the production sitemap in Google Search Console and Bing Webmaster Tools after deployment.
5. Re-check production crawl status after GitHub Pages or hosting finishes publishing the new commit.
