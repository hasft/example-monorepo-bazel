export default class MdsApiError {
  code: string;
  message: string;

  constructor({ code, message }) {
    this.code = code;
    this.message = message;
  }
}
