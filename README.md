# Rain ocean skin

A 16-second looping night-rain sea, rendered in Blender and used as the window
background of DeepSeek Harness. The clip is plain H.264, so the skin needs no
WebGL and almost no GPU.

## What it is

- 1920×1080 source, shipped as a 1280×720 H.264 loop (16 s, 24 fps, ~5.5 MB).
- A lit buoy tower on the right third, wet sea reflections, fine rain streaks
  and soft near-lens droplets.
- The clip is a 16 s render: 384 frames plus 24 extra frames whose tail is
  cross-dissolved into the head, so the loop has no visible cut.

## Install

```text
plugin_manager install_bundle target=link:<path-to>/rain-ocean-skin
```

or add the package to the profile and enable the bundle. The plugin inserts a
Host route (`/rain-ocean`) and a browser module; no other background skin
should be enabled at the same time.

## Use

The rain button beside **Settings** at the sidebar foot opens the popover:

- playback speed 50–150 %
- glass opacity 55–92 %
- enable / disable, reset

## Build from source

The video was rendered from `ocean-buoy/scripts/render_above16.py` (Blender
5.3 + Cycles OptiX, 408 frames at 1280×720 / 48 spp), then loop-closed with
`blend_above16.py` and encoded with ffmpeg.

## License

- Code: MIT — see [LICENSE](LICENSE).
- Rendered video and poster: CC BY 4.0, attribution "Rain ocean skin, rendered
  in Blender".
