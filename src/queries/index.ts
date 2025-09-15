import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { checklist } from './checkList';

export const queries = mergeQueryKeys(checklist);
// 필요 시 여기에 다른 feature keys도 추가: mergeQueryKeys(checklist, users, todos, ...)
export type QueryKeys = typeof queries;
