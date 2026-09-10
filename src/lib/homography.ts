export type Point = readonly [number, number];

/** Four destination corners in stage pixels, ordered top-left, top-right, bottom-left, bottom-right. */
export type Quad = readonly [Point, Point, Point, Point];

type Matrix3 = number[];

function adjugate(m: Matrix3): Matrix3 {
  return [
    m[4] * m[8] - m[5] * m[7],
    m[2] * m[7] - m[1] * m[8],
    m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8],
    m[0] * m[8] - m[2] * m[6],
    m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6],
    m[1] * m[6] - m[0] * m[7],
    m[0] * m[4] - m[1] * m[3],
  ];
}

function multiply(a: Matrix3, b: Matrix3): Matrix3 {
  const out: Matrix3 = [];
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      let sum = 0;
      for (let k = 0; k < 3; k += 1) {
        sum += a[3 * row + k] * b[3 * k + col];
      }
      out[3 * row + col] = sum;
    }
  }
  return out;
}

function transform(m: Matrix3, v: [number, number, number]): [number, number, number] {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function basisToPoints(p1: Point, p2: Point, p3: Point, p4: Point): Matrix3 {
  const m: Matrix3 = [p1[0], p2[0], p3[0], p1[1], p2[1], p3[1], 1, 1, 1];
  const v = transform(adjugate(m), [p4[0], p4[1], 1]);
  return multiply(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

/**
 * CSS transform that maps a `width` by `height` element, with `transform-origin: 0 0`,
 * onto four destination corners. Standard four-point projective mapping.
 */
export function matrix3dForQuad(width: number, height: number, quad: Quad): string {
  const source = basisToPoints([0, 0], [width, 0], [0, height], [width, height]);
  const destination = basisToPoints(quad[0], quad[1], quad[2], quad[3]);
  const h = multiply(destination, adjugate(source));

  const scaled = h.map((value) => value / h[8]);
  const matrix = [
    scaled[0],
    scaled[3],
    0,
    scaled[6],
    scaled[1],
    scaled[4],
    0,
    scaled[7],
    0,
    0,
    1,
    0,
    scaled[2],
    scaled[5],
    0,
    1,
  ];

  return `matrix3d(${matrix.map((value) => Number(value.toFixed(6))).join(",")})`;
}

/** Angle of the quad's top edge, used to line reflections and sheen up with the glass. */
export function quadTopAngle(quad: Quad): number {
  const [topLeft, topRight] = quad;
  return (Math.atan2(topRight[1] - topLeft[1], topRight[0] - topLeft[0]) * 180) / Math.PI;
}
