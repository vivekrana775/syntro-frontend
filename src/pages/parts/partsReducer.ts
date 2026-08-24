import type { Part, PartIncumbent, PartsData } from '@/types';

/** Parts page state: the library lives locally until the API is wired. */
export interface PartsState {
  parts: Part[];
}

export interface PartsAction {
  type: 'part/assignIncumbent';
  id: string;
  incumbent: PartIncumbent;
}

export const initialPartsState = (data: PartsData, empty: boolean): PartsState => ({
  // `empty` renders the designed "No Parts Yet" view (1:20638) from the same code path.
  parts: empty ? [] : [...data.parts],
});

export function partsReducer(state: PartsState, action: PartsAction): PartsState {
  switch (action.type) {
    case 'part/assignIncumbent':
      return {
        ...state,
        parts: state.parts.map((part) =>
          part.id === action.id ? { ...part, incumbent: action.incumbent } : part,
        ),
      };
  }
}
