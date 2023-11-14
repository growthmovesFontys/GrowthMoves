export class Result<T> {
  private _value!: T | null;
  private _exception!: Error | null;

  public get value(): T | null {
    return this._value;
  }

  public get exception(): Error | null {
    return this._exception;
  }

  public get success(): boolean {
    return this._exception == null;
  }

  private constructor(value: T | null, exception: Error | null) {
    this._value = value;
    this._exception = exception;
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(value, null);
  }

  public static fail<U>(exception: Error | null): Result<U> {
    return new Result<U>(null, exception);
  }
}
