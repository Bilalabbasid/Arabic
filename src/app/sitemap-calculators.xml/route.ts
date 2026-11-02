import { NextResponse } from 'next/server';
import { getCalculatorsSitemap, buildXmlUrlSet } from '@/seo/sitemaps';

export async function GET() {
  const entries = getCalculatorsSitemap();
  const xml = buildXmlUrlSet(entries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

