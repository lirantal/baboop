export declare function runCommandAndNotify(commandToRun: CommandToRun): Promise<RunCommandResult>;
interface NotificationResult {
    stdout: string;
    stderr: string;
}
interface ProgramResult {
    name: string;
    code: number;
}
interface RunCommandResult {
    notification: NotificationResult;
    program: ProgramResult;
}
type CommandToRun = string;
export {};
