"use client";

//props로 params를 전달할 수 없는 rootLayout에서 useParams를 사용하기 위해 component를 분리

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {/* id값이 있다면 나오게하고 없다면 null이 나오게 하는 삼항연산자*/}
      {id ? (
        <>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <button
              onClick={async () => {
                const options = { method: "DELETE" };
                const resp = await fetch(
                  `http://localhost:9999/topics/${id}`,
                  options
                );
                await resp.json();
                router.push("/");
                router.refresh();
              }}
            >
              delete
            </button>
          </li>
        </>
      ) : null}
    </ul>
  );
}
