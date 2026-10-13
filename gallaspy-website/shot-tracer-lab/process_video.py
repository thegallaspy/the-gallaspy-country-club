
import argparse
import json
from pathlib import Path

import cv2

from auto_tracker import AutomaticShotTracker


def process_video(video_path, output_path):
    video = cv2.VideoCapture(str(video_path))

    if not video.isOpened():
        raise RuntimeError("Unable to open the video.")

    tracker = AutomaticShotTracker()

    fps = video.get(cv2.CAP_PROP_FPS)
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))

    frame_number = 0
    launch_frame = None
    previous_state = tracker.state
    tracked_frames = []

    try:
        while True:
            success, frame = video.read()

            if not success:
                break

            result = tracker.process_frame(frame)
            state = result["state"]

            if state != previous_state:
                print(
                    f"Frame {frame_number}: "
                    f"{previous_state} -> {state}"
                )
                previous_state = state

            if state == "TRACKING" and launch_frame is None:
                launch_frame = frame_number

            if state == "TRACKING" and result["position"]:
                x, y = result["position"]

                tracked_frames.append({
                    "frame": frame_number,
                    "time": frame_number / fps if fps > 0 else None,
                    "x": x,
                    "y": y,
                })

            frame_number += 1

    finally:
        video.release()

    result_data = {
        "video": str(video_path),
        "width": width,
        "height": height,
        "fps": fps,
        "frames_processed": frame_number,
        "final_state": tracker.state,
        "launch_frame": launch_frame,
        "tracked_frames": tracked_frames,
        "trajectory": tracker.trajectory_generator.get_trajectory(),
        "svg_path": tracker.trajectory_generator.get_svg_path(),
        "tracking_lost": tracker.trajectory_generator.tracking_lost,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w") as file:
        json.dump(result_data, file, indent=2)

    print("GALLASPY SHOT TRACER")
    print("--------------------")
    print(f"Frames analyzed: {frame_number}")
    print(f"Final state: {tracker.state}")
    print(f"Flight positions: {len(tracked_frames)}")
    print(f"Results saved: {output_path}")

    return result_data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Gallaspy automatic golf-shot tracking prototype"
    )

    parser.add_argument("video", type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("shot-tracer-lab/tracking_results.json"),
    )

    args = parser.parse_args()

    if not args.video.is_file():
        parser.error("Video file not found.")

    process_video(args.video, args.output)
