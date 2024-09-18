import { create } from "zustand";

//типы для пользователя и записей
type User = {
  username: string;
  email: string;
};

type Record = {
  title: string;
  description: string;
  image?: string;
  fontSize?: string;
};

// интерфейс для состояния
interface StoreState {
  user: User | null;
  records: Record[];
  setUser: (user: User) => void;
  addRecord: (record: Record) => void;
  editRecord: (index: number, updatedRecord: Record) => void;
}

// Zustand store
const useStore = create<StoreState>((set) => ({
  user: null,
  records: [],
  setUser: (user: User) => set({ user }),
  addRecord: (record: Record) =>
    set((state) => ({
      records: [...state.records, record],
    })),
  editRecord: (index: number, updatedRecord: Record) =>
    set((state) => {
      const updatedRecords = [...state.records];
      updatedRecords[index] = { ...updatedRecords[index], ...updatedRecord };
      return { records: updatedRecords };
    }),
}));

export default useStore;
