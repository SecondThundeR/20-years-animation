import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { all, delay, waitFor } from "@motion-canvas/core/lib/flow";
import { Txt } from "@motion-canvas/2d/lib/components/Txt";
import { createRef, useScene } from "@motion-canvas/core/lib/utils";
import { Layout, Rect } from "@motion-canvas/2d/lib/components";
import { createSignal } from "@motion-canvas/core/lib/signals";
import {
  easeInOutQuint,
  easeInQuint,
  easeOutExpo,
} from "@motion-canvas/core/lib/tweening";
import { blur } from "@motion-canvas/2d/lib/partials";

// TODO: Refactor to proper flexbox/etc.
export default makeScene2D(function* (view) {
  const scene = useScene();
  const accentColor = scene.variables.get("accentColor", "#FF6000");
  const secondaryColor = scene.variables.get("secondaryColor", "#FFA559");

  /* Refs */
  const progressBarTextRef = createRef<Txt>(); // Days left to new "level" text
  const currLevelTextRef = createRef<Txt>(); // Current age "level" text
  const nextLevelTextRef = createRef<Txt>(); // Next age "level" text
  const nextLevelNewTextRef = createRef<Txt>(); // New next age "level" text
  const currProgressRectRef = createRef<Rect>(); // Current progress rectangle
  const mainLayoutRef = createRef<Rect>(); // Main layout reference
  const overlayLayoutRef = createRef<Rect>(); // Overlay layout reference
  const overlayTitleRef = createRef<Txt>(); // Overlay's title text reference
  const overlaySubtitleRef = createRef<Txt>(); // Overlay's subtitle text reference

  /* Signals */
  const daysLeftSignal = createSignal(30); // Days left to next "level" count
  const progressBarWidthSignal = createSignal(788); // Current active progress bar
  const nextLevelSignal = createSignal(20); // Next age "level"
  const blurLevelSignal = createSignal(0); // Elements blur level

  /* Layouts */
  const mainLayout = (
    <Layout ref={mainLayoutRef} filters={[blur(() => blurLevelSignal())]} />
  );
  const overlayLayout = <Layout ref={overlayLayoutRef} opacity={0} />;

  /* Scene config */
  yield mainLayout.add(
    <Txt
      text="Level"
      fontFamily="Ubuntu"
      fontSize={96}
      fontWeight={700}
      fill={secondaryColor}
      position={{
        x: -340,
        y: -30,
      }}
    />
  );
  yield mainLayout.add(
    <Txt
      ref={currLevelTextRef}
      text="19"
      fontFamily="Ubuntu"
      fontSize={160}
      fontWeight={700}
      position={{
        x: -100,
        y: -50,
      }}
      fill={accentColor}
    />
  );

  yield mainLayout.add(
    <Txt
      ref={nextLevelTextRef}
      text="20"
      fontFamily="Ubuntu"
      fontSize={160}
      fontWeight={700}
      position={{
        x: 375,
        y: -50,
      }}
      opacity={0.3}
      fill={accentColor}
    />
  );

  yield mainLayout.add(
    <Txt
      ref={nextLevelNewTextRef}
      text="21"
      fontFamily="Ubuntu"
      fontSize={160}
      fontWeight={700}
      position={{
        x: 375,
        y: -50,
      }}
      opacity={0}
      fill={accentColor}
    />
  );
  yield mainLayout.add(
    <Txt
      ref={progressBarTextRef}
      fontFamily="Ubuntu"
      fontWeight={500}
      fontSize={36}
      text={() =>
        `${Math.floor(daysLeftSignal())} days left to level ${Math.floor(
          nextLevelSignal()
        )}`
      }
      opacity={0.7}
      position={{
        x: 0,
        y: 145,
      }}
      fill={accentColor}
    />
  );
  yield mainLayout.add(
    <Rect
      radius={99}
      width={928}
      height={36}
      position={{
        x: 0,
        y: 80,
      }}
      opacity={0.2}
      fill={accentColor}
    />
  );
  yield mainLayout.add(
    <Rect
      ref={currProgressRectRef}
      radius={99}
      width={() => progressBarWidthSignal()}
      height={36}
      position={{
        x: -70,
        y: 80,
      }}
      fill={accentColor}
    />
  );

  yield overlayLayout.add(
    <Rect width={1920} height={1080} fill="black" opacity={0.5} />
  );
  yield overlayLayout.add(
    <Txt
      ref={overlayTitleRef}
      text="Level up!"
      fontFamily="Ubuntu"
      fill={accentColor}
      fontWeight={700}
      fontSize={96}
      position={{
        x: 0,
        y: 20, // Initial: -80
      }}
      opacity={0}
    />
  );
  yield overlayLayout.add(
    <Txt
      ref={overlaySubtitleRef}
      text={() =>
        `Congratulations on reaching level ${Math.floor(nextLevelSignal() - 1)}
Keep it up!`
      }
      fontFamily="Ubuntu"
      textAlign="center"
      textWrap="pre"
      fill={secondaryColor}
      fontWeight={400}
      fontSize={64}
      position={{
        x: 0,
        y: 160, // Initial: 80
      }}
      opacity={0}
    />
  );

  yield view.add(mainLayout);
  yield view.add(overlayLayout);

  /* Animations */
  yield* delay(
    1,
    all(
      daysLeftSignal(0, 3, easeInQuint),
      progressBarWidthSignal(928, 3, easeInQuint),
      currProgressRectRef().position.x(0, 3, easeInQuint)
    )
  );

  yield* all(
    nextLevelSignal(21, 1, easeInOutQuint),
    progressBarWidthSignal(0, 1, easeInOutQuint),
    currProgressRectRef().position.x(-460, 1, easeInOutQuint),
    currProgressRectRef().opacity(0, 1, easeInOutQuint),
    daysLeftSignal(365, 1, easeInOutQuint),

    nextLevelTextRef().position.x(-100, 1, easeInOutQuint),
    nextLevelTextRef().opacity(1, 1, easeInOutQuint),

    currLevelTextRef().opacity(0, 0.5, easeInOutQuint),
    nextLevelNewTextRef().opacity(0.3, 1, easeInOutQuint)
  );

  yield* delay(
    0.3,
    all(
      blurLevelSignal(50, 0.5, easeInOutQuint),
      overlayLayoutRef().opacity(1, 0.5, easeInOutQuint)
    )
  );

  yield* all(
    overlaySubtitleRef().opacity(1, 0.8, easeOutExpo),
    overlaySubtitleRef().position.y(80, 0.8, easeOutExpo),
    overlayTitleRef().opacity(1, 0.8, easeOutExpo),
    overlayTitleRef().position.y(-80, 0.8, easeOutExpo)
  );

  yield* waitFor(1);
});
