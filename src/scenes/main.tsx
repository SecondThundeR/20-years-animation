import { makeScene2D, Txt, Layout, Rect, blur } from "@motion-canvas/2d";
import {
  all,
  delay,
  waitFor,
  createRef,
  useScene,
  createSignal,
  easeInOutQuint,
  easeInQuint,
  easeOutExpo,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  /* Variables */
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
    <Layout ref={mainLayoutRef} filters={[blur(() => blurLevelSignal())]}>
      <Txt
        text="Level"
        fontFamily="Ubuntu"
        fontWeight={700}
        fontSize={96}
        position={{
          x: -340,
          y: -30,
        }}
        fill={secondaryColor}
      />
      <Txt
        ref={currLevelTextRef}
        text="19"
        fontFamily="Ubuntu"
        fontWeight={700}
        fontSize={160}
        position={{
          x: -100,
          y: -50,
        }}
        fill={accentColor}
      />
      <Txt
        ref={nextLevelTextRef}
        text="20"
        fontFamily="Ubuntu"
        fontWeight={700}
        fontSize={160}
        position={{
          x: 375,
          y: -50,
        }}
        opacity={0.3}
        fill={accentColor}
      />
      <Txt
        ref={nextLevelNewTextRef}
        text="21"
        fontFamily="Ubuntu"
        fontWeight={700}
        fontSize={160}
        position={{
          x: 375,
          y: -50,
        }}
        opacity={0}
        fill={accentColor}
      />
      <Txt
        ref={progressBarTextRef}
        text={() =>
          `${Math.floor(daysLeftSignal())} days left to level ${Math.floor(
            nextLevelSignal()
          )}`
        }
        fontFamily="Ubuntu"
        fontWeight={500}
        fontSize={36}
        position={{
          x: 0,
          y: 145,
        }}
        opacity={0.7}
        fill={accentColor}
      />
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
      <Rect
        ref={currProgressRectRef}
        width={() => progressBarWidthSignal()}
        height={36}
        radius={99}
        position={{
          x: -70,
          y: 80,
        }}
        fill={accentColor}
      />
    </Layout>
  );

  const overlayLayout = (
    <Layout ref={overlayLayoutRef} opacity={0}>
      <Rect width={1920} height={1080} opacity={0.7} fill="black" />
      <Txt
        ref={overlayTitleRef}
        text="Level up!"
        fontFamily="Ubuntu"
        fontWeight={700}
        fontSize={96}
        position={{
          x: 0,
          y: 20, // Initial: -80
        }}
        opacity={0}
        fill={accentColor}
      />
      <Txt
        ref={overlaySubtitleRef}
        text={() =>
          `Congratulations on reaching level ${Math.floor(
            nextLevelSignal() - 1
          )}
Keep it up!`
        }
        fontFamily="Ubuntu"
        fontWeight={400}
        fontSize={64}
        textAlign="center"
        textWrap="pre"
        position={{
          x: 0,
          y: 160, // Initial: 80
        }}
        opacity={0}
        fill={secondaryColor}
      />
    </Layout>
  );

  /* Scene config */
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
      blurLevelSignal(20, 0.5, easeInOutQuint),
      overlayLayoutRef().opacity(1, 0.5, easeInOutQuint)
    )
  );

  yield* all(
    overlaySubtitleRef().opacity(1, 0.8, easeOutExpo),
    overlaySubtitleRef().position.y(80, 0.8, easeOutExpo),
    overlayTitleRef().opacity(1, 1.2, easeOutExpo),
    overlayTitleRef().position.y(-80, 1.2, easeOutExpo)
  );

  yield* waitFor(1);
});
