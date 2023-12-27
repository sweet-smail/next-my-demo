"use client";
import { useEffect, useRef } from "react";

const Load = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    function load() {
      console.log("listener load");
    }
    // next.js 不能直接在iframe标签写src,不回触发onload事件
    if (iframeRef.current) {
      iframeRef.current.src = "http://127.0.0.1:3000/react/load/child";
      iframeRef.current.addEventListener("load", load);
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        iframeRef.current?.removeEventListener("load", load);
      };
    }
  }, []);
  return (
    <div>
      <iframe
        ref={iframeRef}
        onLoad={() => {
          console.log("react onLoad");
        }}
      />
    </div>
  );
};
export default Load;
