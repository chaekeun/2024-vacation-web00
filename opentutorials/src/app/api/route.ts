import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../util/database";
import PostModel from "../../../models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const posts = await PostModel.find({});
        res.status(200).json({
          success: true,
          data: posts,
        });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const post = await PostModel.create(req.body);
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
