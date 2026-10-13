
import cv2
import numpy as np


class GolfBallDetector:
    def __init__(self, min_radius=3, max_radius=30):
        self.min_radius = min_radius
        self.max_radius = max_radius

    def detect(self, frame):
        if frame is None or frame.size == 0:
            return []

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (5, 5), 1.2)

        circles = cv2.HoughCircles(
            gray,
            cv2.HOUGH_GRADIENT,
            dp=1.2,
            minDist=20,
            param1=100,
            param2=20,
            minRadius=self.min_radius,
            maxRadius=self.max_radius,
        )

        candidates = []

        if circles is None:
            return candidates

        height, width = gray.shape

        for x, y, radius in circles[0]:
            x, y, radius = float(x), float(y), float(radius)

            mask = np.zeros((height, width), dtype=np.uint8)
            cv2.circle(
                mask,
                (round(x), round(y)),
                max(1, round(radius * 0.7)),
                255,
                -1,
            )

            brightness = cv2.mean(gray, mask=mask)[0]

            if brightness < 140:
                continue

            candidates.append({
                "x": x,
                "y": y,
                "radius": radius,
                "brightness": round(brightness, 2),
            })

        return sorted(
            candidates,
            key=lambda item: item["brightness"],
            reverse=True,
        )
