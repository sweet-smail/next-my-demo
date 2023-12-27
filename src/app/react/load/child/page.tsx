"use client";
import { useEffect } from "react";

const TestChild = () => {
  useEffect(() => {
    console.log("child load");
  }, []);
  return <div></div>;
};
export default TestChild;
