export default class MediaDevices {
  device: { audio?: string; video?: string } = {
    video: undefined,
    audio: undefined,
  };
  stream?: MediaStream;
  chunks: Blob[] = [];
  recorder?: MediaRecorder;
  constructor() {
    this.device.video = undefined;
    this.device.audio = undefined;
    this.chunks = [];
  }
  getStream() {
    return this.stream;
  }
  async getUserMedia(constraints: MediaStreamConstraints) {
    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    return this.stream;
  }
  async startRecord() {
    const recorder = new MediaRecorder(this.stream!);
    recorder.ondataavailable = (ev) => {
      this.chunks.push(ev.data);
    };
    recorder.start();
    this.recorder = recorder;
  }
  setInputDevice = (constraints: MediaStreamConstraints) => {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.recorder?.stop();
      this.stream = stream;
      this.startRecord();
      // const currentTrack = stream.getTracks();
      // console.log(
      //   "currentTrack",
      //   currentTrack,
      //   constraints,
      //   this.stream?.getTracks()
      // );
      // if (currentTrack.find(({ kind }) => kind === "audio")) {
      //   stream.getAudioTracks().forEach((mediaStreamTrack) => {
      //     this.stream?.addTrack(mediaStreamTrack);
      //   });
      //   // 切换音频
      //   this.stream?.getAudioTracks().forEach((mediaStreamTrack) => {
      //     this.stream?.removeTrack(mediaStreamTrack);
      //   });
      // }
      // if (currentTrack.find(({ kind }) => kind === "video")) {
      // stream.getVideoTracks().forEach((mediaStreamTrack) => {
      //   this.stream?.addTrack(mediaStreamTrack);
      // });
      // // 切换音频
      // this.stream?.getVideoTracks().forEach((mediaStreamTrack) => {
      //   this.stream?.removeTrack(mediaStreamTrack);
      // });
      // }
    });
  };

  stopRecord = async () => {
    return new Promise<string>((resolve, reject) => {
      if (this.recorder) {
        this.recorder.onstop = () => {
          console.log(this.chunks);
          resolve(
            URL.createObjectURL(new Blob(this.chunks, { type: "video/mp4" }))
          );
        };
        this.recorder.stop();
      }
    });
  };

  static async getMediaDevices() {
    return await navigator.mediaDevices.enumerateDevices().then((devices) => {
      return devices.reduce<{
        audioDevices: MediaDeviceInfo[];
        videoDevices: MediaDeviceInfo[];
      }>(
        (result, device) => {
          if (device.kind === "audioinput") {
            return {
              ...result,
              audioDevices: result.audioDevices.concat(device),
            };
          }
          if (device.kind === "videoinput") {
            return {
              ...result,
              videoDevices: result.videoDevices.concat(device),
            };
          }
          return result;
        },
        {
          audioDevices: [],
          videoDevices: [],
        }
      );
    });
  }
}
