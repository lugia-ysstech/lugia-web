/**
 *
 * create by guorg
 *
 * @flow
 */

export function getPoints(radius: number, strokeWidth: number, cnt: number) {
  const ceneter = radius + strokeWidth / 2;
  const points = [];
  for (let i = 0; i <= cnt; i++) {
    const angle = ((320 - i * 2.85) * 3.141592693) / 180;
    const x = ceneter + radius * Math.sin(angle);
    const y = ceneter + radius * Math.cos(angle);
    points.push(`${x},${y}`);
  }
  return points;
}
