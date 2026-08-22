import { useState, type ReactNode } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui';
import type { NavEntry, User } from '@/types';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export interface AppLayoutProps {
  title: string;
  user: User;
  navigation: NavEntry[];
  onNewOrder: () => void;
  children: ReactNode;
}

/** Sidebar + topbar shell (1:1057). Below `lg` the sidebar becomes a drawer — a responsive assumption. */
export function AppLayout({ title, user, navigation, onNewOrder, children }: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNewOrder = () => {
    setDrawerOpen(false);
    onNewOrder();
  };

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar
        navigation={navigation}
        onNewOrder={onNewOrder}
        className="sticky top-0 hidden h-screen lg:flex"
      />

      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent className="left-0 top-0 h-dvh max-h-none w-70 max-w-none translate-x-0 translate-y-0 gap-0 rounded-none p-0 lg:hidden">
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <Sidebar
            navigation={navigation}
            onNewOrder={handleNewOrder}
            className="h-full border-r-0"
          />
        </DialogContent>
      </Dialog>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          user={user}
          onMenuClick={() => {
            setDrawerOpen(true);
          }}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
