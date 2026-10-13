
import cv2
import numpy as np


class GolfBallTracker:
    def __init__(self):
        self.previous_frame = None
        self.previous_points = None
        self.positions = []

    def initialize(self, frame, x, y):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        self.previous_frame = gray
        self.previous_points = np.array(
            [[[float(x), float(y)]]],
            dtype=np.float32
        )

        self.positions = [(float(x), float(y))]

    def update(self, frame):
        if self.previous_points is None:
            return None

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        next_points, status, error = cv2.calcOpticalFlowPyrLK(
            self.previous_frame,
            gray,
            self.previous_points,
            None,
            winSize=(21, 21),
            maxLevel=3
        )

        if (
            next_points is None
            or status is None
            or status[0][0] != 1
        ):
            self.previous_points = None
            return None

        x, y = next_points[0][0]

        self.positions.append((float(x), float(y)))
        self.previous_frame = gray
        self.previous_points = next_points

        return float(x), float(y)

    def get_trajectory(self):
        return self.positions.copy()
