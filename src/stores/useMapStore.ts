import { create } from 'zustand';
import {
  getPlans,
  getFolders,
  getPropertiesByFolder,
  type PlanSummary,
  type FolderSummary,
  type PropertySummary,
} from '@/components/map/mapData';

type State = {
  plans: PlanSummary[];
  planId: number;
  folders: FolderSummary[];
  folderId: number;
  propsInFolder: PropertySummary[];
  selectedPropId: number | null;
};

type Actions = {
  setPlanId: (planId: number) => void;
  setFolderId: (folderId: number) => void;
  setSelectedPropId: (propertyId: number | null) => void;
};

const initialPlans = getPlans();
const initialPlanId = initialPlans[0]?.planId ?? 1;
const initialFolders = getFolders(initialPlanId);
const initialFolderId = initialFolders[0]?.folderId ?? 0;
const initialProps = getPropertiesByFolder(initialFolderId);

export const useMapStore = create<State & Actions>((set, get) => ({
  plans: initialPlans,
  planId: initialPlanId,
  folders: initialFolders,
  folderId: initialFolderId,
  propsInFolder: initialProps,
  selectedPropId: null,

  setPlanId: (planId) => {
    const folders = getFolders(planId);
    const folderId = folders[0]?.folderId ?? 0;
    const propsInFolder = getPropertiesByFolder(folderId);
    set({
      planId,
      folders,
      folderId,
      propsInFolder,
      selectedPropId: null,
    });
  },

  setFolderId: (folderId) => {
    const propsInFolder = getPropertiesByFolder(folderId);
    set({ folderId, propsInFolder, selectedPropId: null });
  },

  setSelectedPropId: (propertyId) => set({ selectedPropId: propertyId }),
}));

export const selectMarkers = (s: State) =>
  s.propsInFolder.map((p) => ({
    id: p.propertyId,
    lat: p.latitude,
    lng: p.longitude,
    type: (p as any).memoType ?? 'PROPERTY',
    active: s.selectedPropId === p.propertyId,
  }));

export const selectSelectedProp = (s: State) =>
  s.selectedPropId
    ? (s.propsInFolder.find((p) => p.propertyId === s.selectedPropId) ?? null)
    : null;
