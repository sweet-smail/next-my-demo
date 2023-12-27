import { Select, Option } from "@/app/mui";
import { useMidiaDevices } from "../hooks";
import type { FC } from "react";
const DeviceList: FC<{
  onChangeDevice?: (device: { audio: string; video: string }) => void;
  device?: { audio: string; video: string };
}> = ({ onChangeDevice, device }) => {
  const [{ audioDevices, videoDevices }, setDevices] = useMidiaDevices();
  const getDefaultDevice = (devices: { deviceId: string }[]) => {
    const defaultIdDevice = devices.find(
      ({ deviceId }) => deviceId === "default"
    );
    if (defaultIdDevice) return defaultIdDevice.deviceId;
    return devices[0]?.deviceId;
  };
  device = device || {
    audio: getDefaultDevice(audioDevices) || "",
    video: getDefaultDevice(videoDevices) || "",
  };
  return (
    <>
      <Select
        onChange={() => {}}
        label="麦克风"
        placeholder="麦克风"
        value={device.audio}
      >
        {audioDevices.map(({ label, deviceId }) => (
          <Option
            value={deviceId}
            key={deviceId}
            onClick={() => {
              onChangeDevice?.({ ...device!, audio: deviceId! });
            }}
          >
            {label}
          </Option>
        ))}
      </Select>
      <Select
        label="摄像头"
        placeholder="摄像头"
        // onChange={(val) => {}}
        value={device?.video}
      >
        {videoDevices.map(({ label, deviceId }) => (
          <Option
            value={deviceId}
            onClick={() => {
              onChangeDevice?.({ ...device!, video: deviceId! });
            }}
            key={deviceId}
          >
            {label}
          </Option>
        ))}
      </Select>
    </>
  );
};
export default DeviceList;
