import { gamepadConfigMap } from "@renderer/constant/gamepad";
import type { Action } from "./typing";

const { deadZone } = gamepadConfigMap;

// 映射手柄操作
export function mapGamepad(gamepad: Gamepad): Set<Action> {
  const actions = new Set<Action>();
  const [leftX, leftY, rightX, rightY] = gamepad.axes;

  // 交互键
  if (gamepad.buttons[0]?.pressed) actions.add("confirm");
  if (gamepad.buttons[1]?.pressed) actions.add("back");
  if (gamepad.buttons[2]?.pressed) actions.add("secondary");
  if (gamepad.buttons[3]?.pressed) actions.add("option");

  // 方向键
  if (gamepad.buttons[12]?.pressed) actions.add("up");
  if (gamepad.buttons[13]?.pressed) actions.add("down");
  if (gamepad.buttons[14]?.pressed) actions.add("left");
  if (gamepad.buttons[15]?.pressed) actions.add("right");

  // 肩键
  if (gamepad.buttons[4]?.pressed) actions.add("lb");
  if (gamepad.buttons[5]?.pressed) actions.add("rb");

  // 扳机键
  if (gamepad.buttons[6]?.pressed) actions.add("lt");
  if (gamepad.buttons[7]?.pressed) actions.add("rt");

  // 功能键
  if (gamepad.buttons[8]?.pressed) actions.add("view");
  if (gamepad.buttons[9]?.pressed) actions.add("menu");
  if (gamepad.buttons[17]?.pressed) actions.add("share");

  // 左摇杆
  if (leftY < -deadZone) actions.add("up");
  if (leftY > deadZone) actions.add("down");
  if (leftX < -deadZone) actions.add("left");
  if (leftX > deadZone) actions.add("right");

  // 右摇杆
  if (rightY < -deadZone) actions.add("up");
  if (rightY > deadZone) actions.add("down");
  if (rightX < -deadZone) actions.add("left");
  if (rightX > deadZone) actions.add("right");

  return actions;
}
