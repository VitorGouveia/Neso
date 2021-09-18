import type { NextApiRequest, NextApiResponse } from 'next'

import { ions, IonType } from "./ions"

export default function handler(request: NextApiRequest, response: NextApiResponse<IonType[]>) {
  if(request.method === "GET") {
    response.status(200).json([...ions])
  }
}
