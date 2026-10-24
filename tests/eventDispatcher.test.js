import { EventDispatcher } from "../src/eventDispatcher.js";

export async function runEventDispatcherTest() {
  const dispatcher = new EventDispatcher();
  let received = null;

  dispatcher.on("guard.check.completed", (payload) => {
    received = payload;
    return { ack: true };
  });

  const results = await dispatcher.dispatch("guard.check.completed", { checkId: "chk_987", status: "pass" });
  return {
    test: "event-dispatcher-lifecycle",
    passed: received !== null && received.checkId === "chk_987" && results[0].ack === true,
  };
}
