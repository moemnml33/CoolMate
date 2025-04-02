import React, { createContext, useContext, useState } from 'react';
import { ProfileDrawer } from '@/components/ProfileDrawer';

type ProfileDrawerContextType = {
  showDrawer: () => void;
  hideDrawer: () => void;
};

const ProfileDrawerContext = createContext<ProfileDrawerContextType | undefined>(undefined);

export function ProfileDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const showDrawer = () => setIsVisible(true);
  const hideDrawer = () => setIsVisible(false);

  return (
    <ProfileDrawerContext.Provider value={{ showDrawer, hideDrawer }}>
      {children}
      <ProfileDrawer isVisible={isVisible} onClose={hideDrawer} />
    </ProfileDrawerContext.Provider>
  );
}

export const useProfileDrawer = () => {
  const context = useContext(ProfileDrawerContext);
  if (!context) {
    throw new Error('useProfileDrawer must be used within a ProfileDrawerProvider');
  }
  return context;
}; 