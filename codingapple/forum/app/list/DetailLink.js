"use client";
import { useRouter } from "next/navigation";

export default function DetailLink(props) {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`${props.url}`);
      }}
    >
      DetailLink Button
    </button>
  );
}
