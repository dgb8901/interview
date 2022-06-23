export default class RespData<T = any> {
  code: number;
  result: string;
  message: string;
  data: T;
  constructor(code: number, result: string) {
    this.code = code;
    this.result = result;
  }

  static success(message?: string, data?: any): RespData {
    const response = new RespData(200, 'success');
    response.message = message;
    response.data = data;
    return response;
  }

  static fail(message?: string): RespData {
    const response = new RespData(400, 'error');
    response.message = message;
    return response;
  }
}
