import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NAVASAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Navasan API key not configured' }, { status: 500 });
  }

  const url = `http://api.navasan.tech/latest/?api_key=${apiKey}&item=ton`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Navasan API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch data from Navasan' }, { status: response.status });
    }

    const data = await response.json();

    const priceString = data.ton?.value;

    if (!priceString || typeof priceString !== 'string') {
        return NextResponse.json({ error: 'Price format from API is invalid' }, { status: 500 });
    }

    const price = parseFloat(priceString.replace(/,/g, ''));

    return NextResponse.json({ price });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}