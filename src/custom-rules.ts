import { resetSystem, restartService } from "./actions";
import { onSystemDown, onSystemError, onSystemUp } from "./events";

export function enableCustomRules() {
  const errorBuffer = [];
  let inProgress = false;
  setInterval(async () => {
    if (!inProgress) {
      inProgress = true;
      if (errorBuffer.length > 0) {
        if (errorBuffer.length === 1 && errorBuffer[0] === "gui") {
          restartService("gui");
        } else {
          await resetSystem();
        }
        errorBuffer.length = 0;
      }
      inProgress = false;
    }
  }, 1000 * 10);

  onSystemError(async (event) => {
    console.log(`Error occurred in ${event.app}`);
    errorBuffer.push(event.app);
  });

  onSystemUp(async (event) => {
    console.log(`${event.app} up`);
  });

  onSystemDown(async (event) => {
    console.log(`${event.app} - down`);
    if (event.app === "gui") {
      await restartService("gui");
    }
  });
}
