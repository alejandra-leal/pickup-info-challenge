export interface IContextBuilder<T> {
    buildContextValue: () => Promise<T>
  }