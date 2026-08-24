export type KnowledgeCategory = 'observation' | 'rule';

/** Category labels in the Knowledge table (1:23511); rendered as plain text, not pills. */
export const KNOWLEDGE_CATEGORY: Record<KnowledgeCategory, string> = {
  observation: 'Observation',
  rule: 'Rule',
};

/** One learned memory row (1:23511). All display values are pre-formatted strings. */
export interface KnowledgeMemory {
  id: string;
  category: KnowledgeCategory;
  memory: string;
  evidenceLabel: string;
  confidenceLabel: string;
  lastSeenLabel: string;
}

export interface KnowledgeData {
  title: string;
  subtitle: string;
  memories: KnowledgeMemory[];
}
