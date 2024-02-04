//update는 create와 read 두가지 기능이 다 필요하다.

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  //해당되는 글을 form에 넣기 위해 state 만들어준다.
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //라우터 객체
  const router = useRouter();
  //현재 id값을 가져오기 위해 useParams 사용
  const params = useParams();
  const id = params.id;

  async function refresh() {
    const resp = await fetch(`http://localhost:9999/topics/${id}`);
    const topic = await resp.json();
    setTitle(topic.title);
    setBody(topic.body);
  }

  //컴포넌트 초기화 or 처음 렌더링 시에만 특정 동작 수행
  useEffect(() => {
    refresh();
  }, []);

  return (
    //사용자와 상호작용할 때 실행되는 onSubmit = 서버컴포넌트에서 다루지 않는다.
    <form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        //서버족으로 데이터를 전송해야하기 때문에 페이지가 전환되는 기본 동작을 방지하는 함수
        e.preventDefault();
        //이벤트 객체의 타깃(form태그)의 name이 무엇인 값을 구하는 방법
        const title = (e.target as HTMLFormElement).title.value;
        const body = (e.target as HTMLFormElement).body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };

        const resp = await fetch(`http://localhost:9999/topics/${id}`, options);
        const topic = await resp.json();
        router.push(`/read/${topic.id}`);
        router.refresh();

        // fetch(`http://localhost:9999/topics/${id}`, options)
        //   .then((res) => res.json())
        //   .then((result) => {
        //     console.log(result);
        //     const lastid = result.id;
        //     //방금 생성한 페이지로 리디렉션하기 위해 라우터 객체 이용
        //     router.push(`read/${lastid}`);
        //     //서버 컴포넌트를 서버 쪽에서 다시 랜더링해서 새로고침
        //     router.refresh();
        //   });
      }}
    >
      <p>
        {/* 값이 바뀔때마다 set함수로 state값이 바뀌게 한다. */}
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
