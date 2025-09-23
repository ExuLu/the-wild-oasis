import { useContext } from 'react';
import DarkModeContext from './DarkModeContext';

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used out of DarkModeProvider');

  return context;
};
