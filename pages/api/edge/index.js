import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge', // do this is a pre-requisite
};

export default (req) => {
  return NextResponse.json({
    name: `Hello, from ${req.url} I'm now an Edge Function!`,
  });
};