
from ball_detector import GolfBallDetector
from track_ball import GolfBallTracker
from impact_detector import GolfImpactDetector
from trajectory_generator import TrajectoryGenerator


class AutomaticShotTracker:
    def __init__(self):
        self.detector = GolfBallDetector()
        self.tracker = GolfBallTracker()
        self.impact_detector = GolfImpactDetector()
        self.trajectory_generator = TrajectoryGenerator()
        self.state = "SEARCHING"
        self.candidate = None
        self.stable_frames = 0
        self.required_stable_frames = 5
        self.max_position_change = 8

    def process_frame(self, frame):
        if self.state == "SEARCHING":
            candidates = self.detector.detect(frame)

            if not candidates:
                self.candidate = None
                self.stable_frames = 0
                return self.result()

            ball = candidates[0]

            if self.candidate is not None:
                distance = (
                    (ball["x"] - self.candidate["x"]) ** 2
                    + (ball["y"] - self.candidate["y"]) ** 2
                ) ** 0.5

                if distance <= self.max_position_change:
                    self.stable_frames += 1
                else:
                    self.stable_frames = 1
            else:
                self.stable_frames = 1

            self.candidate = ball

            if self.stable_frames >= self.required_stable_frames:
                self.tracker.initialize(
                    frame,
                    ball["x"],
                    ball["y"]
                )
                self.impact_detector.initialize(ball["x"], ball["y"])
                self.state = "BALL_LOCKED"

            return self.result()

        if self.state in ("BALL_LOCKED", "TRACKING"):
            position = self.tracker.update(frame)

            if position is None:
                self.trajectory_generator.mark_tracking_lost()
                self.state = "LOST"
                return self.result()

            if self.state == "BALL_LOCKED" and self.impact_detector.update(*position):
                self.state = "TRACKING"

            if self.state == "TRACKING":
                self.trajectory_generator.add_position(*position)

            return self.result(position)

        return self.result()

    def result(self, position=None):
        return {
            "state": self.state,
            "candidate": self.candidate,
            "position": position,
            "trajectory": self.trajectory_generator.get_trajectory(),
            "svg_path": self.trajectory_generator.get_svg_path(),
        }
