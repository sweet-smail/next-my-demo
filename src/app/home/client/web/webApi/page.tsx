"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const dataSource = [
  {
    title: "cache",
    desc: "web 缓存",
  },
  {
    title: "message",
    desc: "iframe之间，tab之间进行通信",
  },
];

const WebApiPage = () => {
  const pathname = usePathname();
  return <div>12</div>;
};
export default WebApiPage;
