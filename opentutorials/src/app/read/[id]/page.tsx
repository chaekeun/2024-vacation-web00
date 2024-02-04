export default async function Read(props) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
    cache: "no-store",
  });
  const topic = await resp.json();
  return (
    <>
      <h2>Read: Dynamic Routing에 대해 배우는 page</h2>
      parameters = [params명] : {props.params.id}
      <h3>{topic.title}</h3>
      {topic.body}
    </>
  );
}
