"use client";
import Image from "next/image";
import birdPng from "../../assets/bird.png";
import { useEffect, useRef, useState } from "react";

const EventsPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);
  const [style, setStyle] = useState({
    left: "50%",
    top: "50%",
    width: 100,
    transform: "translate(-50%,-50%)",
  });
  useEffect(() => {
    const { left, top } = window.getComputedStyle(targetRef.current!);
    setStyle((preStyle) => ({
      ...preStyle,
      left,
      top,
    }));
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      console.log("event", event);
      // 代表按着alt 则需要进行放大缩小
      if (event.altKey) {
        // 放大
        if (event.deltaY > 0) {
          setStyle((preStyle) => ({ ...preStyle, width: preStyle.width - 5 }));
        }
        // 缩小
        if (event.deltaY < 0) {
          setStyle((preStyle) => ({ ...preStyle, width: preStyle.width + 5 }));
        }
      } else {
        // 向右
        if (event.deltaX < 0) {
          return setStyle((preStyle) => {
            return {
              ...preStyle,
              left: parseFloat(preStyle.left) + 2 + "px",
            };
          });
        }
        // 向左
        if (event.deltaX > 0) {
          return setStyle((preStyle) => {
            return {
              ...preStyle,
              left: parseFloat(preStyle.left) - 2 + "px",
            };
          });
        }
        // 向上
        if (event.deltaY > 0) {
          return setStyle((preStyle) => {
            return {
              ...preStyle,
              top: parseFloat(preStyle.top) - 2 + "px",
            };
          });
        }
        if (event.deltaY < 0) {
          return setStyle((preStyle) => {
            return {
              ...preStyle,
              top: parseFloat(preStyle.top) + 2 + "px",
            };
          });
        }
      }

      // 上下左右滚动
    };

    wrapperRef.current?.addEventListener("wheel", handleWheel, {
      // 重要
      passive: false,
    });
  }, []);
  return (
    <div ref={wrapperRef} className="relative" style={{ height: 600 }}>
      <Image
        ref={targetRef}
        className="absolute"
        style={style}
        src={birdPng}
        alt="bird"
      ></Image>
    </div>
  );
};
export default EventsPage;
