import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const timer = setTimeout(() => {
    res.status(200).json({})

    clearTimeout(timer)
  }, 1000)
}