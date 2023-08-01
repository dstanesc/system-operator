import { EventEmitter } from "events";
import { type } from "os";

export const twinEmitter = new EventEmitter();

export type SystemEvent = {
  type: "Down" | "Error" | "Up";
  app: string;
  wrapped: any;
};

export type SystemErrorEvent = SystemEvent & {
  type: "Error";
};

export type SystemDownEvent = SystemEvent & {
  type: "Down";
};

export type SystemUpEvent = SystemEvent & {
  type: "Up";
};

export type SystemEventCallback = (event: SystemEvent) => Promise<void>;

export function onSystemEvent(callback: SystemEventCallback) {
  twinEmitter.on("event", callback);
}

export async function onSystemError(
  callback: (event: SystemErrorEvent) => Promise<void>
) {
  twinEmitter.on("event", async (event) => {
    if (event.type === "Error") {
      await callback(event);
    }
  });
}

export function onSystemDown(
  callback: (event: SystemDownEvent) => Promise<void>
) {
  twinEmitter.on("event", async (event) => {
    if (event.type === "Down") {
      await callback(event);
    }
  });
}

export function onSystemUp(callback: (event: SystemUpEvent) => Promise<void>) {
  twinEmitter.on("event", async (event) => {
    if (event.type === "Up") {
      await callback(event);
    }
  });
}

export function emitSystemEvent(event: SystemEvent) {
  twinEmitter.emit("event", event);
}
