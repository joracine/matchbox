

export class Validator {
  static _checkRangeInclusive(min:number, max:number, value:number):number {
    if (value < min || value > max)
      throw new Error(`${value} is not within ${min} and ${max}, inclusively.`);
    return value;
  }

  static _checkArraySize(min:number, max:number, array:any[]):any[] {
    if (array.length < min || array.length > max)
      throw new Error(`The array has a length of ${array.length}, which is not within ${min} and ${max}, inclusively.`);
    return array;
  }

  static _checkTrue(value:boolean, message:string = `Value is ${value} but should be true`) {
    if (value != true)
      throw new Error(message);
    return value;
  }
}
