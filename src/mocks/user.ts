import avatar1x from '@/assets/images/avatar@1x.png';
import avatar2x from '@/assets/images/avatar@2x.png';
import type { User } from '@/types';

export const currentUser: User = {
  name: 'Alex Rivera',
  role: 'Observer',
  avatar: {
    src: avatar1x,
    srcSet: `${avatar1x} 1x, ${avatar2x} 2x`,
    alt: 'Alex Rivera',
  },
};
