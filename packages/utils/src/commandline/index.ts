import { promisify } from "node:util";
import { exec } from "node:child_process";

export async function useCommand(command: string[], onError?: (e: Error) => void) {
  const commandString = command.join(" \\\n");
  const execPromise = promisify(exec);
  try {
    const { stdout } = await execPromise(commandString);
    return stdout;
  } catch (error) {
    if (onError) {
      onError(error as Error);
    } else {
      throw error;
    }
  }
}
