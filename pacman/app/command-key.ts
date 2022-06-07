export interface CommandKey {
  keyName: "Up" | "Down" | "Left" | "Right"
  pressed: boolean
  lastKey?: boolean
}