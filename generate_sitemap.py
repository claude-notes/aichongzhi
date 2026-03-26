from __future__ import annotations

import os
from datetime import datetime, timezone
from pathlib import Path


def normalize_site_url(raw: str) -> str:
    site_url = raw.strip()
    if not site_url:
        raise ValueError("SITE_URL is empty")
    if site_url.endswith("/"):
        site_url = site_url[:-1]
    return site_url


def build_sitemap(site_url: str) -> str:
    lastmod = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    urls: list[tuple[str, str, str]] = [
        (f"{site_url}", "daily", "1.0"),
        (f"{site_url}/guide.html", "weekly", "0.8"),
        (f"{site_url}/faq.html", "weekly", "0.8"),
    ]

    lines: list[str] = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for loc, changefreq, priority in urls:
        lines.extend(
            [
                "  <url>",
                f"    <loc>{loc}</loc>",
                f"    <lastmod>{lastmod}</lastmod>",
                f"    <changefreq>{changefreq}</changefreq>",
                f"    <priority>{priority}</priority>",
                "  </url>",
            ]
        )

    lines.append("</urlset>")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    raw_site_url = os.environ.get("SITE_URL")
    if not raw_site_url:
        raise SystemExit(
            'Missing SITE_URL. Example: SITE_URL="https://your-domain.com" python generate_sitemap.py'
        )

    site_url = normalize_site_url(raw_site_url)
    out_path = Path("sitemap.xml")
    out_path.write_text(build_sitemap(site_url), encoding="utf-8")
    print(f"Wrote {out_path} for {site_url}")


if __name__ == "__main__":
    main()

