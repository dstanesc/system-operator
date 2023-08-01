import Docker from "dockerode";
import { emitSystemEvent } from "./events";

export function enableSystemEvents(docker: Docker) {
  docker.getEvents(
    (
      err: any,
      stream: {
        on: (
          arg0: string,
          arg1: { (chunk: any): void; (err: any): void }
        ) => void;
      }
    ) => {
      if (err) {
        console.error("Failed to listen to Docker events:", err);
        return;
      }

      stream.on("data", (chunk: { toString: () => string }) => {
        const event = JSON.parse(chunk.toString());
        if (event.Type === "container" && event.status === "die") {
          if (event.Actor.Attributes.exitCode === "0") {
            emitSystemEvent({
              type: "Down",
              app: event.Actor.Attributes["com.docker.compose.service"],
              wrapped: event,
            });
          } else if (event.Actor.Attributes.exitCode !== "0") {
            emitSystemEvent({
              type: "Error",
              app: event.Actor.Attributes["com.docker.compose.service"],
              wrapped: event,
            });
          }
        }
        if (event.Type === "container" && event.status === "start") {
          emitSystemEvent({
            type: "Up",
            app: event.Actor.Attributes["com.docker.compose.service"],
            wrapped: event,
          });
        }
      });
      stream.on("error", (err: any) => {
        console.error("Error streaming Docker events:", err);
      });
    }
  );
}
