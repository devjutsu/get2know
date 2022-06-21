// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TwitterApi } from 'twitter-api-v2';
const needle = require('needle');

const endpointUrl = 'https://api.twitter.com/2/tweets/search/all'

type Data = {
  name: string
}

const twiclient = (new TwitterApi(process.env.BEARER_TOKEN || ''));
const client = twiclient.readOnly;

async function getRequest() {

    // These are the parameters for the API request
    // specify Tweet IDs to fetch, and any additional fields that are required
    // by default, only the Tweet ID and text are returned
    const params = {
        'query': 'from:twitterdev -is:retweet',
        'tweet.fields': 'author_id'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2FullArchiveJS",
            "authorization": `Bearer ${process.env.BEARER_TOKEN}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    try {
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    
  res.send('ok' as any);
}
