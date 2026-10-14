(() => {
  "use strict";

  // Offline educational summaries of the Rules of Golf.
  // Official rules and applicable Local Rules take precedence.
  window.GallaspyGolfRules = Object.freeze([
    {
      id: "lost-ball",
      category: "lost-ball",
      title: "Lost Ball",
      question: "What happens if I cannot find my ball?",
      answer: "A ball is lost if it is not found within three minutes after you or your caddie begin searching. Normally, you must take stroke-and-distance relief: add one penalty stroke and play again from where the previous stroke was made. A properly played provisional ball may save time.",
      reference: "Rules 18.2, 18.3",
      keywords: "lost missing search three minutes provisional"
    },
    {
      id: "out-of-bounds",
      category: "lost-ball",
      title: "Out of Bounds",
      question: "What if my ball goes beyond the course boundary?",
      answer: "If your ball is out of bounds, the standard procedure is stroke-and-distance relief: add one penalty stroke and play again from where the previous stroke was made. Some courses adopt Model Local Rule E-5, which provides an alternative with a two-stroke penalty. Check the course's Local Rules.",
      reference: "Rule 18.2; Model Local Rule E-5",
      keywords: "ob white stakes boundary fence two strokes"
    },
    {
      id: "red-penalty-area",
      category: "penalty-area",
      title: "Red Penalty Area",
      question: "What are my options if my ball enters a red penalty area?",
      answer: "You may play the ball as it lies if permitted, or take penalty relief. With one penalty stroke, your options generally include stroke-and-distance, back-on-the-line relief, or lateral relief within two club-lengths of the reference point, not nearer the hole.",
      reference: "Rule 17.1",
      keywords: "red stakes water hazard lake creek lateral"
    },
    {
      id: "yellow-penalty-area",
      category: "penalty-area",
      title: "Yellow Penalty Area",
      question: "What if my ball enters a yellow penalty area?",
      answer: "You may play the ball as it lies if permitted. For one penalty stroke, you may take stroke-and-distance relief or back-on-the-line relief. The lateral relief option available for red penalty areas does not generally apply.",
      reference: "Rule 17.1",
      keywords: "yellow stakes water hazard pond"
    },
    {
      id: "bunker-touching-sand",
      category: "bunker",
      title: "Touching Sand in a Bunker",
      question: "Can my club touch the sand before a bunker shot?",
      answer: "Some contact with sand is allowed, but you must not deliberately touch sand to test its condition, touch sand with your club immediately in front of or behind the ball, make a practice swing touching sand, or touch sand during your backswing for the stroke.",
      reference: "Rule 12.2",
      keywords: "sand trap grounding club practice swing"
    },
    {
      id: "unplayable-bunker",
      category: "bunker",
      title: "Unplayable Ball in a Bunker",
      question: "What if I cannot play my ball from a bunker?",
      answer: "You may use the usual unplayable-ball relief options for one penalty stroke, but relief must remain in the bunker except for stroke-and-distance. An additional back-on-the-line option outside the bunker is available for a total penalty of two strokes.",
      reference: "Rule 19.3",
      keywords: "sand trap unplayable drop outside bunker"
    },
    {
      id: "cart-path",
      category: "relief",
      title: "Ball on a Cart Path",
      question: "Do I get free relief from a paved cart path?",
      answer: "A paved cart path is generally an immovable obstruction. When it interferes with your ball's lie, stance, or intended swing, you may usually take free relief using the nearest point of complete relief and a one-club-length relief area, no nearer the hole. Restrictions apply, including when the ball is in a penalty area.",
      reference: "Rule 16.1",
      keywords: "road path concrete pavement obstruction free drop"
    },
    {
      id: "temporary-water",
      category: "relief",
      title: "Temporary Water",
      question: "Can I take relief from standing water?",
      answer: "Temporary water is an abnormal course condition. Free relief is generally available when it interferes with your ball, stance, or intended swing, subject to the rules for the area of the course. Special procedures apply in bunkers and on putting greens.",
      reference: "Rules 16.1, 16.1c, 16.1d",
      keywords: "puddle rain standing water casual water"
    },
    {
      id: "repair-ball-mark",
      category: "putting-green",
      title: "Repairing Damage on the Green",
      question: "Can I repair a ball mark on the putting green?",
      answer: "You may repair damage on the putting green, including ball marks and most other damage defined by the Rule. This does not allow changing natural surface imperfections or normal maintenance practices beyond what the Rule permits.",
      reference: "Rule 13.1c",
      keywords: "pitch mark spike mark repair green"
    },
    {
      id: "mark-lift-clean",
      category: "putting-green",
      title: "Marking and Cleaning Your Ball",
      question: "Can I lift and clean my ball on the green?",
      answer: "When your ball is on the putting green, you may mark its spot, lift it, clean it, and replace it on its original spot. Mark the spot before lifting the ball.",
      reference: "Rules 13.1b, 14.1",
      keywords: "marker coin lift replace clean putt"
    },
    {
      id: "play-ball-as-it-lies",
      category: "general",
      title: "Play the Ball as It Lies",
      question: "Can I move my ball to a better position?",
      answer: "The basic principle is to play the ball as it lies and the course as you find it, unless a Rule permits relief or another action. Moving a ball without authorization can result in a penalty.",
      reference: "Rules 8, 9",
      keywords: "improve lie move ball fairway rough"
    },
    {
      id: "provisional-ball",
      category: "general",
      title: "Playing a Provisional Ball",
      question: "When should I hit a provisional ball?",
      answer: "If your original ball might be lost outside a penalty area or out of bounds, you may play a provisional ball to save time. You must announce that it is a provisional before making the stroke. Specific rules determine when it becomes the ball in play.",
      reference: "Rule 18.3",
      keywords: "second ball lost ob tee reload"
    }
  ]);
})();
