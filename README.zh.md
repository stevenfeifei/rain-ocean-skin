# 雨海皮肤

一段用 Blender 渲染的 16 秒夜雨海面循环，作为 DeepSeek Harness 的窗口背景。视频是普通 H.264，所以皮肤不需要 WebGL，也几乎不占 GPU。

[English](README.md) | 中文

## 是什么

- 源片 1920×1080，发布为 1280×720 的 H.264 循环（16 秒、24fps、约 5.5MB）。
- 画面右侧三分之一是一座亮着的浮标灯塔，湿海面反光、毫米级细雨丝、镜头附近少量虚焦水滴。
- 成片由 16 秒渲染（384 帧）加 24 帧尾部素材组成，尾部叠化进片头，所以循环没有可见接缝。

## 安装

```text
plugin_manager install_bundle target=link:<path-to>/rain-ocean-skin
```

或者把包加进 profile 并启用 bundle。插件会插入一个 Host 路由（`/rain-ocean`）和一个浏览器模块；同一时间不要启用其他背景皮肤。

## 使用

侧栏底部、**设置**旁边的雨滴按钮打开面板：

- 播放速度 50–150%
- 玻璃不透明度 55–92%
- 启用 / 关闭、恢复默认

## 从源码构建

视频从 `ocean-buoy/scripts/render_above16.py` 渲染（Blender 5.3 + Cycles OptiX，408 帧、1280×720 / 48 spp），再用 `blend_above16.py` 做首尾闭合、ffmpeg 编码。

## 许可证

- 代码：MIT — 见 [LICENSE](LICENSE)。
- 渲染视频与封面：CC BY 4.0，署名 “Rain ocean skin, rendered in Blender”。
