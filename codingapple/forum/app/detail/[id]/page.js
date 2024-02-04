import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h2>This is Detail Page</h2>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}
