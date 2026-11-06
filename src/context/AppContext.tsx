import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface AppContextType {
  /** Intro preloader has finished (true immediately when it is not shown). */
  isPreloaderFinished: boolean;
  setPreloaderFinished: () => void;
  /**
   * The current page has been uncovered and may start its entrance animations.
   * Turns false the moment a new route is swapped in (while the wipe still covers it)
   * and true again when the wipe starts leaving – so entrance animations are never
   * wasted behind the transition panel.
   */
  isPageReady: boolean;
  setPageReady: (ready: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  isPreloaderFinished: false,
  setPreloaderFinished: () => {},
  isPageReady: false,
  setPageReady: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);

  const setPreloaderFinished = useCallback(() => {
    setIsPreloaderFinished(true);
  }, []);

  const setPageReady = useCallback((ready: boolean) => {
    setIsPageReady(ready);
  }, []);

  const value = useMemo(
    () => ({ isPreloaderFinished, setPreloaderFinished, isPageReady, setPageReady }),
    [isPreloaderFinished, setPreloaderFinished, isPageReady, setPageReady]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const usePreloaderFinished = () => useContext(AppContext).isPreloaderFinished;
export const useSetPreloaderFinished = () => useContext(AppContext).setPreloaderFinished;
export const usePageReady = () => useContext(AppContext).isPageReady;
export const useSetPageReady = () => useContext(AppContext).setPageReady;
