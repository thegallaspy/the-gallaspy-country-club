
import argparse
import json
from pathlib import Path

import cv2
import numpy as np
import imageio_ffmpeg


def render_tracer(video_path, tracking_path, output_path):
    video_path = Path(video_path)
    tracking_path = Path(tracking_path)
    output_path = Path(output_path)

    with tracking_path.open("r") as file:
        tracking = json.load(file)

    video = cv2.VideoCapture(str(video_path))

    if not video.isOpened():
        raise RuntimeError("Unable to open the original video.")

    fps = video.get(cv2.CAP_PROP_FPS)
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))

    if fps <= 0 or width <= 0 or height <= 0:
        video.release()
        raise RuntimeError("Invalid video properties.")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    positions_by_frame = {
        int(item["frame"]): (
            float(item["x"]),
            float(item["y"]),
        )
        for item in tracking.get("tracked_frames", [])
    }

    trajectory = []
    frame_number = 0
    writer = None

    try:
        writer = imageio_ffmpeg.write_frames(
            str(output_path),
            (width, height),
            fps=fps,
            codec="libx264",
            pix_fmt_in="rgb24",
            pix_fmt_out="yuv420p",
            output_params=["-crf", "18"],
            macro_block_size=1,
        )

        writer.send(None)

        while True:
            success, frame = video.read()

            if not success:
                break

            position = positions_by_frame.get(frame_number)

            if position is not None:
                x, y = position

                if (
                    np.isfinite(x)
                    and np.isfinite(y)
                    and 0 <= x < width
                    and 0 <= y < height
                ):
                    trajectory.append((round(x), round(y)))

            if len(trajectory) >= 2:
                points = np.array(
                    trajectory, dtype=np.int32
                ).reshape((-1, 1, 2))

                # White outline for visibility.
                cv2.polylines(
                    frame, [points], False,
                    (255, 255, 255), 9,
                    cv2.LINE_AA
                )

                # Red Gallaspy flight tracer.
                cv2.polylines(
                    frame, [points], False,
                    (35, 35, 225), 5,
                    cv2.LINE_AA
                )

            if trajectory:
                cv2.circle(
                    frame,
                    trajectory[-1],
                    6,
                    (255, 255, 255),
                    -1,
                    cv2.LINE_AA
                )

            rgb_frame = cv2.cvtColor(
                frame, cv2.COLOR_BGR2RGB
            )

            writer.send(rgb_frame.tobytes())
            frame_number += 1

    finally:
        video.release()

        if writer is not None:
            writer.close()

    print("GALLASPY SHOT TRACER")
    print("--------------------")
    print(f"Frames rendered: {frame_number}")
    print(f"Trajectory points: {len(trajectory)}")
    print(f"Output video: {output_path}")

    return output_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Render a Gallaspy golf shot tracer"
    )

    parser.add_argument("video", type=Path)
    parser.add_argument("tracking", type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("shot-tracer-lab/gallaspy-traced.mp4"),
    )

    args = parser.parse_args()

    render_tracer(args.video, args.tracking, args.output)
