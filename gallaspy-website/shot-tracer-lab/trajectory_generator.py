
import math


class TrajectoryGenerator:
    def __init__(self, minimum_distance=2):
        self.minimum_distance = minimum_distance
        self.points = []
        self.tracking_lost = False

    def add_position(self, x, y):
        if self.tracking_lost:
            return False

        point = (float(x), float(y))

        if self.points:
            distance = math.dist(self.points[-1], point)

            if distance < self.minimum_distance:
                return False

        self.points.append(point)
        return True

    def mark_tracking_lost(self):
        self.tracking_lost = True

    def reset(self):
        self.points = []
        self.tracking_lost = False

    def get_trajectory(self):
        return self.points.copy()

    def get_svg_path(self):
        if not self.points:
            return ""

        start = self.points[0]
        commands = [f"M {start[0]:.2f} {start[1]:.2f}"]

        for x, y in self.points[1:]:
            commands.append(f"L {x:.2f} {y:.2f}")

        return " ".join(commands)
