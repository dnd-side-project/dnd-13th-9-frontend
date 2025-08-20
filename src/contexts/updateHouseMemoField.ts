export const createFieldUpdater =
  <T extends object>(state: T, setState: React.Dispatch<React.SetStateAction<T>>) =>
  <K extends keyof T>(key: K, value: T[K]) => {
    setState({ ...state, [key]: value });
  };
