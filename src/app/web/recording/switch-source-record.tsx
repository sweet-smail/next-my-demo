import { Button, ButtonGroup } from "@material-tailwind/react";
import DeviceList from "./components/devices";
import { useEffect, useRef, useState } from "react";
import { MediaDevices } from "./utils/";
export default function SelectInputSourceRecord() {
  const media = useRef<MediaDevices>();
  const liveVideo = useRef<HTMLVideoElement>(null);
  const replayVideo = useRef<HTMLVideoElement>(null);

  const [] = useState();
  useEffect(() => {
    media.current = new MediaDevices();
  }, []);
  const handleOpenDevice = async () => {
    await media.current!.getUserMedia({
      audio: true,
      video: true,
    });
    liveVideo.current!.srcObject = media.current?.getStream()!;
    liveVideo.current?.play();
  };
  const handleRecord = async () => {
    media.current?.startRecord();
  };
  const handleStopRecord = () => {
    media.current?.stopRecord().then((url) => {
      replayVideo.current!.src = url;
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <DeviceList
        onChangeDevice={(device) => {
          media.current?.setInputDevice({
            audio: { deviceId: { exact: device.audio } },
            video: { deviceId: { exact: device.video } },
          });
        }}
      ></DeviceList>
      <ButtonGroup className="justify-center">
        <Button onClick={handleOpenDevice}>实时录像</Button>
        <Button onClick={handleRecord}>开始录制</Button>
        <Button onClick={handleStopRecord}>停止录制</Button>
      </ButtonGroup>
      <div className="flex w-full gap-4">
        <div className="flex-1">
          直播画面：
          <video
            controls
            muted
            className="h-full w-full rounded-lg"
            ref={liveVideo}
          ></video>
        </div>
        <div className="flex-1">
          回放画面：
          <video
            className="h-full w-full rounded-lg"
            ref={replayVideo}
            controls
          ></video>
        </div>
      </div>
    </div>
  );
}
