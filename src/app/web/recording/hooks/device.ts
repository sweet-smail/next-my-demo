import { useEffect, useState } from "react";
import { MediaDevices } from "../utils";
type devicesProps = Awaited<ReturnType<typeof MediaDevices.getMediaDevices>>;
/**
 * @description 获取设备
 * @returns
 */
export const useMidiaDevices = () => {
  const [devices, setDevices] = useState<devicesProps>({
    audioDevices: [],
    videoDevices: [],
  });
  useEffect(() => {
    MediaDevices.getMediaDevices().then((devices) => {
      setDevices(devices);
    });
  }, []);
  return [devices, setDevices] as const;
};

export const requestDevicePermission = () => {
  return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
};
