export default interface ReturnType<T> {
  code?: string;
  data?: T;
  nextCursor?: number;
}
