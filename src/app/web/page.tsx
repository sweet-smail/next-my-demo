"use client";
import { List, ListItem } from "@/app/mui";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function WebPage() {
  const pathname = usePathname();
  return (
    <List placeholder="">
      <Link href="/web/recording" className="font-z">
        <ListItem placeholder="">Recoding</ListItem>
      </Link>
      <Link href="#" className="">
        <ListItem placeholder="">Trash</ListItem>
      </Link>
      <Link href="#" className="text-initial">
        <ListItem placeholder="">Settings</ListItem>
      </Link>
      <Link href={`${pathname}/events`} className="text-initial">
        <ListItem placeholder="">Event</ListItem>
      </Link>
    </List>
  );
}
