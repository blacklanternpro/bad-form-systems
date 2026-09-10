import { DeskIms } from "@/components/lab/ims/DeskIms";
import { PhoneIms } from "@/components/lab/ims/PhoneIms";
import type { StillPlate } from "@/content/stills";
import { matrix3dForQuad, quadTopAngle, type Point, type Quad } from "@/lib/homography";

interface StillCompositeProps {
  still: StillPlate;
  debug?: boolean;
}

/** Grow or shrink the mapped quad. Phones stay at 0 so the glass mask can meet the bezel. */
function expandQuad(quad: Quad, pixels: number): Quad {
  if (pixels === 0) return quad;

  const centreX = quad.reduce((sum, point) => sum + point[0], 0) / 4;
  const centreY = quad.reduce((sum, point) => sum + point[1], 0) / 4;

  return quad.map((point) => {
    const dx = point[0] - centreX;
    const dy = point[1] - centreY;
    const length = Math.hypot(dx, dy) || 1;
    return [point[0] + (dx / length) * pixels, point[1] + (dy / length) * pixels] as Point;
  }) as unknown as Quad;
}

function quadWidth(quad: Quad): number {
  return Math.hypot(quad[1][0] - quad[0][0], quad[1][1] - quad[0][1]);
}

export function StillComposite({ still, debug = false }: StillCompositeProps) {
  const { stage, screen, glass } = still;
  const screenQuad = expandQuad(still.quad, glass.expand);
  const spillQuad = expandQuad(still.quad, glass.spillBlur * 0.9);

  const scale = quadWidth(screenQuad) / screen.width;
  const angle = quadTopAngle(still.quad);
  const isPhone = still.device === "phone";

  const screenTransform = matrix3dForQuad(screen.width, screen.height, screenQuad);
  const spillTransform = matrix3dForQuad(screen.width, screen.height, spillQuad);

  return (
    <div
      className="still-stage"
      style={{ width: `${stage.width}px`, height: `${stage.height}px` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size photographic plate, encoded by the shoot script */}
      <img className="still-plate" src={still.plate} alt="" width={stage.width} height={stage.height} />

      <div
        className="still-layer still-spill"
        style={{
          width: `${screen.width}px`,
          height: `${screen.height}px`,
          transform: spillTransform,
          background: glass.tint,
          opacity: glass.spillOpacity,
          filter: `blur(${(glass.spillBlur / scale).toFixed(2)}px)`,
        }}
        aria-hidden="true"
      />

      {isPhone ? (
        <div
          className="still-layer still-phone-cover"
          style={{
            width: `${screen.width}px`,
            height: `${screen.height}px`,
            transform: matrix3dForQuad(
              screen.width,
              screen.height,
              expandQuad(still.quad, glass.expand + 5),
            ),
            background: still.paint === "dusk" ? "#14161a" : "#eef0f3",
          }}
          aria-hidden="true"
        />
      ) : null}

      <div
        className="still-layer"
        style={{
          width: `${screen.width}px`,
          height: `${screen.height}px`,
          transform: screenTransform,
        }}
      >
        {/* Blur lives inside the mask. On the outer layer it would halo past the
            glass and paint a rectangle of UI onto the bezel and the camera. */}
        <div className={isPhone ? "still-screen-inner still-phone-glass" : "still-screen-inner"}>
          <div
            className="still-screen-body"
            style={{
              filter: `brightness(${glass.brightness}) blur(${(glass.blur / scale).toFixed(2)}px)`,
            }}
          >
            {isPhone ? <PhoneIms paint={still.paint} /> : <DeskIms paint={still.paint} />}

            <div
              className="still-grade"
              style={{ background: glass.tint, opacity: glass.tintOpacity }}
              aria-hidden="true"
            />
            <div
              className="still-sheen"
              style={{
                background: `linear-gradient(${(angle + 104).toFixed(1)}deg, rgb(255 255 255 / 0.9) 0%, rgb(255 255 255 / 0) 34%, rgb(255 255 255 / 0) 68%, rgb(255 255 255 / 0.5) 100%)`,
                opacity: glass.sheenOpacity,
              }}
              aria-hidden="true"
            />
            <div className="still-falloff" aria-hidden="true" />
            <div className="still-grain" aria-hidden="true" />
          </div>
        </div>
      </div>

      {debug ? (
        <>
          <div
            className="still-layer still-debug"
            style={{
              width: `${screen.width}px`,
              height: `${screen.height}px`,
              transform: screenTransform,
            }}
            aria-hidden="true"
          />
          {still.quad.map((point) => (
            <span
              key={`${point[0]}-${point[1]}`}
              className="still-debug-corner"
              style={{ left: `${point[0]}px`, top: `${point[1]}px` }}
              aria-hidden="true"
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
