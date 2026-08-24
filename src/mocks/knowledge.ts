import type { KnowledgeData } from '@/types';

/** Learned memories table (1:23399). Row text is truncated with "..." exactly as designed. */
export const knowledge: KnowledgeData = {
  title: 'Knowledge',
  subtitle: '6 memories · learned from your workflows',
  memories: [
    {
      id: 'mem-meridian-pricing',
      category: 'observation',
      memory: 'Meridian CNC quotes ~15% under Talon on machined...',
      evidenceLabel: '0 Events',
      confidenceLabel: '92%',
      lastSeenLabel: 'Jul 6',
    },
    {
      id: 'mem-pcb-lead-time',
      category: 'observation',
      memory: 'PCB-CTRL-01 lead time from Delta Circuits has...',
      evidenceLabel: '0 Events',
      confidenceLabel: '56%',
      lastSeenLabel: 'Jul 1',
    },
    {
      id: 'mem-brk-frame-price',
      category: 'observation',
      memory: 'BRK-FRAME-01 unit price drops below $11 once...',
      evidenceLabel: '0 Events',
      confidenceLabel: '78%',
      lastSeenLabel: 'Jun 7',
    },
    {
      id: 'mem-nova-promises',
      category: 'observation',
      memory: 'Nova Electronics has missed 2 of its last 5 promised...',
      evidenceLabel: '0 Events',
      confidenceLabel: '81%',
      lastSeenLabel: 'Jun 6',
    },
    {
      id: 'mem-mil-spec-wire',
      category: 'rule',
      memory: 'Mil-spec wire (M22759) must be sourced from an...',
      evidenceLabel: '0 Events',
      confidenceLabel: '95%',
      lastSeenLabel: 'Jun 1',
    },
  ],
};
