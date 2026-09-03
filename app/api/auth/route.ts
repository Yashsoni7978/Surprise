import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // The answer is specific to the couple's relationship/inside joke
    // We will hardcode this for simplicity, but it provides the privacy barrier.
    if (password.toLowerCase() === 'sun saathiya' || password === '04092026' || password === '4thsept') {
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set HttpOnly cookie for security
      response.cookies.set({
        name: 'entry_token',
        value: 'authorized_riyu_and_yash',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      
      return response;
    }

    return NextResponse.json(
      { error: 'Incorrect answer. Try again.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
