// pages/api/items.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await MongoClient.connect(process.env.MONGODB_URI!)
  const col    = client.db('ts_Demo').collection('Demo_Items')

  let data: any
  let status = 200

  if (req.method === 'POST') {
    // create a new item
    await col.insertOne(req.body)
    data   = req.body
    status = 201
  } else {
    // fetch all items
    data = await col.find().toArray()
  }

  await client.close()
  res.status(status).json(data)
}
