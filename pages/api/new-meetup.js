// POST api/new-meetup

import prisma from "../../lib/prisma";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log('data', data);
    await prisma.meetup.create({ data });
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
