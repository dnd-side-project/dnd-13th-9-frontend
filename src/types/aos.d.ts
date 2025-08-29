declare module 'aos' {
  const AOS: {
    init(options?: Record<string, unknown>): void;
    refresh(): void;
  };
  export default AOS;
}
