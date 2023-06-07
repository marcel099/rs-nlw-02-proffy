import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { HAS_COMPLETED_ONBOARDING } from '@configs/storage';

interface OnboardingContextData {
  isCheckingIfHasCompletedOnboarding: boolean;
  hasCompletedOnboarding: boolean;
  handleCompleteOnboarding: () => Promise<boolean>;
}

const OnboardingContext = createContext({} as OnboardingContextData);

interface OnboardingContextProviderProps {
  children: ReactNode;
}

export function OnboardingContextProvider({
  children,
}: OnboardingContextProviderProps) {
  const [isCompletingOnboarding, setIsCompletingOnboarding] =
    useState(false);
  const [
    isCheckingIfHasCompletedOnboarding,
    setIsCheckingIfHasCompletedOnboarding,
  ] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState(false);

  async function handleCompleteOnboarding() {
    if (isCompletingOnboarding) {
      return false;
    }

    setIsCompletingOnboarding(true);

    await AsyncStorage.setItem(
      HAS_COMPLETED_ONBOARDING,
      JSON.stringify(true)
    );

    return true;
  }

  async function checkIfHasCompletedOnboarding() {
    const response = await AsyncStorage.getItem(HAS_COMPLETED_ONBOARDING);
    if (response !== null && JSON.parse(response) === true) {
      setHasCompletedOnboarding(true);
    } else {
      setHasCompletedOnboarding(false);
    }

    setIsCheckingIfHasCompletedOnboarding(false);
  }

  useEffect(() => {
    checkIfHasCompletedOnboarding();
  }, []);

  const value = useMemo(() => ({
    hasCompletedOnboarding,
    isCheckingIfHasCompletedOnboarding,
    handleCompleteOnboarding,
  }), [hasCompletedOnboarding, isCheckingIfHasCompletedOnboarding]);

  return (
    <OnboardingContext.Provider value={value}>
      { children }
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
