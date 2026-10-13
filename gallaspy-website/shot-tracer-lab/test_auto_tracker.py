
import numpy as np
from auto_tracker import AutomaticShotTracker

tracker = AutomaticShotTracker()
frame = np.zeros((720, 1280, 3), dtype=np.uint8)

# Simulate a stationary ball being detected.
tracker.detector.detect = lambda frame: [
    {"x": 300, "y": 500, "radius": 6, "brightness": 240}
]

# Replace optical flow with controlled test positions.
positions = iter([
    (300, 500),
    (320, 500),
    (340, 500),
])

tracker.tracker.update = lambda frame: next(positions)

assert tracker.state == "SEARCHING"

for _ in range(5):
    result = tracker.process_frame(frame)

assert result["state"] == "BALL_LOCKED"
print("Ball locking: PASS")

result = tracker.process_frame(frame)
assert result["state"] == "BALL_LOCKED"
print("Stationary monitoring: PASS")

result = tracker.process_frame(frame)
assert result["state"] == "BALL_LOCKED"

result = tracker.process_frame(frame)
assert result["state"] == "TRACKING"
print("Automatic launch transition: PASS")

assert len(result["trajectory"]) == 1
assert result["trajectory"][0] == (340.0, 500.0)
assert result["svg_path"] == "M 340.00 500.00"
print("Post-launch trajectory: PASS")
