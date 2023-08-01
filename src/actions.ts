import { promisify } from "util";
import { exec as execCallback } from "child_process";
const exec = promisify(execCallback);

async function upSystem() {
  const command = "docker-compose up -d";
  try {
    const xhostCommand = "xhost +local:docker";
    await exec(xhostCommand);
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log("Containers up successfully");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

async function downSystem(volumes: boolean) {
  const command = `docker-compose down ${volumes ? "--volumes" : ""}`;
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log("Containers and volumes removed successfully");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

async function stopSystem() {
  const command = "docker-compose stop";
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log("Containers stopped successfully");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

async function startSystem() {
  const command = "docker-compose start";
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log("Containers started successfully");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function restartService(service: string) {
  const command = `docker-compose restart ${service}`;
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(`Service ${service} restarted successfully`);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

export async function resetSystem() {
  console.log("Resetting the system...");
  await sleep(1000 * 10);
  await downSystem(true);
  await sleep(1000 * 10);
  await upSystem();
}

export async function revertSystem() {
  console.log("Reverting the system...");
  await sleep(1000 * 10);
  await stopSystem();
  await sleep(1000 * 10);
  await startSystem();
}
