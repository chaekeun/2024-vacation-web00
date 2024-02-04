//cf: page.js라는 파일마다 function을 하나씩 필수로 만들고 거기에 html 레이아웃을 넣어야 한다.

"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  //라우터 객체
  const router = useRouter();
  return (
    //사용자와 상호작용할 때 실행되는 onSubmit = 서버컴포넌트에서 다루지 않는다.
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        //서버족으로 데이터를 전송해야하기 때문에 페이지가 전환되는 기본 동작을 방지하는 함수
        e.preventDefault();
        //이벤트 객체의 타깃(form태그)의 name이 무엇인 값을 구하는 방법
        const title = (e.target as HTMLFormElement).title.value;
        const body = (e.target as HTMLFormElement).body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`http://localhost:9999/topics`, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            //방금 생성한 페이지로 리디렉션하기 위해 라우터 객체 이용
            router.push(`read/${lastid}`);
            //서버 컴포넌트를 서버 쪽에서 다시 랜더링해서 새로고침
            router.refresh();
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title"></input>
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
