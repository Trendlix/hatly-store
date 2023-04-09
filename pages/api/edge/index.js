import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge', // do this is a pre-requisite
  // regions: ['iad1'], // only execute this function on iad1
};

export default async function handler(req) {
  return new Response(
    JSON.stringify({
      name: 'John Doe',
    }),
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=86400',
        'Content-Type': 'application/json',
      },
    },
  );
}
// export default function handler(req, res) {
//   return NextResponse.headers({
//     'Content-Type': 'application/json',
//     'Cache-Control': 's-maxage=1, stale-while-revalidate',
//   }).json({
//     name: `Hello, from ${req.url} I'm now an Edge Function!`,
//   });
// }
