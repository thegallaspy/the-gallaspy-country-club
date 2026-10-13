
import math


class GolfImpactDetector:
    def __init__(
        self,
        movement_threshold=15,
        confirmation_frames=2
    ):
        self.movement_threshold = movement_threshold
        self.confirmation_frames = confirmation_frames
        self.start_position = None
        self.previous_position = None
        self.moving_frames = 0
        self.launched = False

    def initialize(self, x, y):
        self.start_position = (float(x), float(y))
        self.previous_position = self.start_position
        self.moving_frames = 0
        self.launched = False

    def update(self, x, y):
        if self.start_position is None:
            return False

        if self.launched:
            return True

        current = (float(x), float(y))

        distance_from_start = math.dist(
            self.start_position,
            current
        )

        movement = math.dist(
            self.previous_position,
            current
        )

        if (
            distance_from_start >= self.movement_threshold
            and movement >= self.movement_threshold
        ):
            self.moving_frames += 1
        else:
            self.moving_frames = 0

        self.previous_position = current

        if self.moving_frames >= self.confirmation_frames:
            self.launched = True

        return self.launched
