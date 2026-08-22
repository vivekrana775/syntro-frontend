import { useSearchParams } from 'react-router-dom';

import { TAB_PARAM } from '@/lib/constants';

/**
 * Active pill tab from `?tab=`; unknown or missing values resolve to `fallback`.
 * Tab changes replace the history entry so Back leaves the screen instead of cycling tabs.
 */
export function useTabParam<T extends string>(
  tabs: readonly T[],
  fallback: T,
): [T, (tab: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(TAB_PARAM);
  const tab = tabs.find((candidate) => candidate === raw) ?? fallback;

  const setTab = (next: T) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set(TAB_PARAM, next);
        return params;
      },
      { replace: true },
    );
  };

  return [tab, setTab];
}
