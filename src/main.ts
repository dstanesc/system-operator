import Docker from "dockerode";
import { enableSystemEvents } from "./operator";
import { enableCustomRules } from "./custom-rules";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

enableSystemEvents(docker);

enableCustomRules();
