/**
 *
 * create by ligx
 *
 * @flow
 */
export function updateVersion(): void {
  this.version++;
  if (this.version >= Number.MAX_VALUE) {
    this.version = 0;
  }
}
