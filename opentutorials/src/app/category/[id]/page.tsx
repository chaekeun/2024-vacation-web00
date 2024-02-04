export default async function Category(props) {
  // const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
  //     cache: "no-store",
  //   });
  //   const topic = await resp.json();

  return (
    <>
      <h2>Category1 Page</h2>
      parameters = [params명] : {props.params.id}
    </>
  );
}
