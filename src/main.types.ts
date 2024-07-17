// types.ts

export interface NotificationResult {
    stdout: string;
    stderr: string;
  }
  
  export interface ProgramResult {
    name: string;
    code: number;
  }
  
  export interface RunCommandResult {
    notification: NotificationResult;
    program: ProgramResult;
  }
  
  export type CommandToRun = string;
  