import { create } from 'zustand';
import {
  getPlans,
  getFolders,
  type PlanSummary,
  type FolderSummary,
} from '@/components/map/mapData';
import type { ViewModel } from '@/types/memo-view-model';

type State = {
  plans: PlanSummary[];
  planId: number;
  folders: FolderSummary[];
  folderId: number;
  memosInFolder: ViewModel[];
  selectedMemoId: string | null;
  didInitPlanFromApi: boolean;
};

type Actions = {
  setPlanId: (planId: number) => void;
  setFolderId: (folderId: number) => void;
  setSelectedMemoId: (memoId: string | null) => void;
  setMemosInFolder: (memos: ViewModel[]) => void;
  initPlanFromApi: (plans: Array<{ planId: number; createdAt: string }>) => void;
};

const initialPlans = getPlans();
const initialPlanId = initialPlans[0]?.planId ?? 1;
const initialFolders = getFolders(initialPlanId);
const initialFolderId = initialFolders[0]?.folderId ?? 0;
const initialMemos: ViewModel[] = [];

export const useMapStore = create<State & Actions>((set, get) => ({
  plans: initialPlans,
  planId: initialPlanId,
  folders: initialFolders,
  folderId: initialFolderId,
  memosInFolder: initialMemos,
  selectedMemoId: null,
  didInitPlanFromApi: false,

  setPlanId: (planId) => {
    const folders = getFolders(planId);
    const folderId = folders[0]?.folderId ?? 0;
    set({
      planId,
      folders,
      folderId,
      memosInFolder: [],
      selectedMemoId: null,
    });
  },

  setFolderId: (folderId) => {
    set({ folderId, memosInFolder: [], selectedMemoId: null });
  },

  setSelectedMemoId: (memoId) => set({ selectedMemoId: memoId }),

  setMemosInFolder: (memos) => set({ memosInFolder: memos }),

  // 최초 한 번만 API의 최신 계획으로 planId 초기화 (스토어 plans 자체는 유지)
  initPlanFromApi: (plansFromApi) => {
    const { didInitPlanFromApi } = get();
    if (didInitPlanFromApi) return;
    if (!plansFromApi || plansFromApi.length === 0) return;
    const latest = [...plansFromApi].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
    if (!latest) return;
    // setPlanId 내부 로직을 재사용하여 폴더/매물 동기화
    get().setPlanId(latest.planId);
    set({ didInitPlanFromApi: true });
  },
}));
