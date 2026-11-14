# Rain ocean · HD video skin

Rain ocean replaces the window background with a Blender-rendered 1080p
night-rain sea that loops seamlessly. The clip is a plain H.264 file, so the
skin needs no WebGL, no shaders and almost no GPU.

## What is in the clip

- Night rain over an open sea, a lit buoy tower on the right third.
- The tower lamp reflects on the wet water as a broken gold band.
- Thin, real-scale rain streaks and soft near-lens droplets.
- The 12 s loop is a 6 s forward render followed by its reverse, so the first
  and last frames match exactly and the loop has no visible cut.

## How the skin is built

- Host plugin serves the video under `/rain-ocean` with byte-range support so
  the browser can stream and loop it.
- The browser module mounts a pointer-transparent iframe at `z-index: 0`
  behind the app and applies glass theme tokens to the shell.
- The rain button beside **Settings** at the sidebar foot opens the popover.

## Controls

| Control | Effect |
| --- | --- |
| Playback speed | 50–150% of the recorded 24 fps motion |
| Glass opacity | Opacity of the translucent shell over the video, 55–92% |
| Enable | Removes or restores the video while keeping the button |
| Reset | Restores every default |

Changes apply immediately and are stored in the page's local storage; the
popover footer confirms each save and shows the source resolution.

## Video

- 1920×1080, 24 fps, H.264, 12 s seamless loop (6 s forward + 6 s reverse).
- Rendered in Blender with Cycles (RTX 5060, OptiX), 64 samples + OIDN.
- The file is bundled in `native-dist/rain-loop.mp4` (~11 MB); the poster is
  `native-dist/poster.jpg`.

## Limitations

- One background skin should be enabled at a time.
- The loop is a ping-pong render: wave motion reverses at the halfway point,
  which is what makes the seam invisible.
