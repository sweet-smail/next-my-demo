"use client";

import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@/app/mui";
import BaseRecodingVideo from "./base-record";
import SelectInputSourceRecord from "./switch-source-record";
import { useState } from "react";

/**
 * TODO:
 * 1. 基础视频录制
 * 2. 允许切换录入设备
 * 3. 允许旋转画面
 * 4. 允许对某一个画面进行截图
 */
export default function Recoding() {
  const [value, setValue] = useState("base-recoding-record");
  const data = [
    {
      label: "基础视频录制",
      value: "base-recoding-record",
      desc:
        value === "base-recoding-record" ? (
          <BaseRecodingVideo></BaseRecodingVideo>
        ) : (
          ""
        ),
    },
    {
      label: "视频录制(切换数据源)",
      value: "switch-inpout-source-record",
      desc:
        value === "switch-inpout-source-record" ? (
          <SelectInputSourceRecord></SelectInputSourceRecord>
        ) : (
          ""
        ),
    },
  ];
  return (
    <div className="mt-6 flex-1">
      <Tabs value={value}>
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} onClick={() => setValue(value)}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="h-full">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
