export class BusinessError extends Error {
  status: number;
  message: string;
  stack: string;
  statusCode: number;

  constructor(stack: string, message: string, status: number) {
    super();
    this.stack = stack;
    this.message = message;
    this.status = status;
    this.statusCode = status;
  }
}
