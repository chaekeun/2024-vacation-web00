import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await connectDB;
  //접속하고싶은 데이터베이스(프로젝트) 이름
  const db = client.db("forum");
  db.collection("post").find();

  return <div>Hello, NextJS!</div>;
}
