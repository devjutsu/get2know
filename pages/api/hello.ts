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


  
  const ids = ["1255542774432063488", "1278747501642657792"];

  const user = await client.users.findUserByUsername('devjutsu');
  // console.log('user:', user.data);

  // const tweet = (await client.tweets.findTweetById('1500526320094171145'));
  // console.log(tweet);
  // res.status(200).json({ name: tweet.data?.text || '-'});

  try {
    const tweets = await client.tweets.findTweetsById({ids:ids});
    // console.log(tweets);
    const result = tweets.data?.map(t => t);
    console.log('res: ', result);

  } catch (ex) {
    console.log(ex);
  }
  res.send('ok' as any);
}
