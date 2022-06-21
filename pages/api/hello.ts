// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from "twitter-api-sdk";

type Data = {
  name: string
}

const client = new Client(process.env.BEARER_TOKEN || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // const response = await fetch('http://twitter.com');
  // const data = await response.text();
  // console.log(data);


  const user = await client.users.findUserByUsername('devjutsu');
  // console.log('user:', user.data);
  
  const tweet = (await client.tweets.findTweetById('1500526320094171145'));
  console.log(tweet);
  // const tmp = twee tweet.data?.text || tweet.data?.source;
  
  res.status(200).json({ name: tweet.data?.text || '-'});
}
