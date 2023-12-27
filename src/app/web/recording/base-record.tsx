"use client";
import { ButtonGroup, Button } from "@/app/mui";
import { useEffect, useRef, useState } from "react";
import { requestDevicePermission } from "./hooks";
export default function RecodingVideo() {
  const [disabelRecoding, changeDisableRecoding] = useState(false);
  const mediaRecorder = useRef<MediaRecorder>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const replayVideo = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream>();
  useEffect(() => {
    async function requestRecord() {
      const stram = await requestDevicePermission();
      if (!videoRef.current) {
        return;
      }
      let chunks: Blob[] = [];
      videoRef.current.srcObject = stram;
      stream.current = stram;
      videoRef.current.play();
      const recorder = new MediaRecorder(stram);
      recorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
        recorder.onstop = function () {
          const blob = new Blob(chunks, { type: "video/mp4" });
          chunks = [];
          replayVideo.current!.src = URL.createObjectURL(blob);
          const playPromise = replayVideo.current!.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {}).catch(() => {});
          }
        };
        mediaRecorder.current = recorder;
      };
    }
    requestRecord();
    return () => {
      mediaRecorder.current?.stop();
    };
  }, []);
  const handleCheckVolume = async () => {
    if (stream.current) {
      const audioContext = new globalThis.AudioContext();
      let microphone = audioContext.createMediaStreamSource(stream.current);
      await audioContext.audioWorklet.addModule("/processor.js");
      const node = new AudioWorkletNode(audioContext, "vumeter");
      node.port.onmessage = (event) => {
        console.log(event.data.volume);
      };
      microphone.connect(node).connect(audioContext.destination);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <ButtonGroup className="justify-center">
        <Button
          disabled={disabelRecoding}
          onClick={() => {
            mediaRecorder.current?.start();
            changeDisableRecoding(true);
          }}
        >
          开始录制
        </Button>
        <Button onClick={handleCheckVolume}>音量检测</Button>
        <Button
          onClick={() => {
            mediaRecorder.current?.stop();
            changeDisableRecoding(false);
          }}
        >
          停止录制
        </Button>
      </ButtonGroup>
      <div className="flex gap-7">
        采集视频：
        <video
          preload="none"
          muted
          ref={videoRef}
          className="h-full  rounded-lg w-48"
        ></video>
        回放视频：
        <div className="relative">
          <video
            className="h-full  rounded-lg w-48"
            ref={replayVideo}
            autoPlay
            controls
          ></video>
        </div>
      </div>
    </div>
  );
}
