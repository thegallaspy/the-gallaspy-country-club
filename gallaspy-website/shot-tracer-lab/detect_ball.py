
import sys
from pathlib import Path

import cv2


def analyze_video(video_path):
    video = cv2.VideoCapture(str(video_path))

    if not video.isOpened():
        print("ERROR: Unable to open video.")
        return

    fps = video.get(cv2.CAP_PROP_FPS)
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frame_count = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

    print("GALLASPY SHOT TRACER")
    print("--------------------")
    print(f"Resolution: {width} x {height}")
    print(f"Frame rate: {fps:.2f} FPS")
    print(f"Total frames: {frame_count}")

    if fps > 0:
        print(f"Duration: {frame_count / fps:.2f} seconds")

    success, frame = video.read()

    if success:
        print("First video frame loaded successfully.")
        print(f"Frame dimensions: {frame.shape}")
    else:
        print("ERROR: Unable to read the first frame.")

    video.release()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python detect_ball.py video.mp4")
        sys.exit(1)

    path = Path(sys.argv[1])

    if not path.is_file():
        print("ERROR: Video file not found.")
        sys.exit(1)

    analyze_video(path)
