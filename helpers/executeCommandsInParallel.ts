import { executeCommand, Command } from './executeCommand';

/**
 * Executes JS functions or shell commands in parallel and returns 1 as soon
 * as one command or function fails.
 * Supports asynchronous functions.
 * @param commands The shell commands or JavaScript functions to
 * execute in parallel
 */
export function executeCommandsInParallel(commands: Command[]) {
  // Promise.all rejects as soon as one promise rejects
  return Promise.all(commands.map(executeCommand));
}

export default executeCommandsInParallel;
