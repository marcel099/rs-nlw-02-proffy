import {
  createStackNavigator, StackScreenProps,
} from '@react-navigation/stack';

import { useOnboarding } from '@contexts/OnboardingContext';

import { Confirmation } from '@screens/Confirmation';
import { Onboarding } from '@screens/Onboarding';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type NonAuthStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgottenPassword: undefined;
  Confirmation: {
    title: string;
    description: string;
    buttonTitle: string;
    nextScreenName: keyof NonAuthStackParamList;
  };
}

export type NonAuthStackScreenProp<T extends keyof NonAuthStackParamList>
  = StackScreenProps<NonAuthStackParamList, T>;

const { Navigator, Screen } = createStackNavigator<NonAuthStackParamList>();

export function NonAuthRoutes() {
  const {
    hasCompletedOnboarding,
    isCheckingIfHasCompletedOnboarding,
  } = useOnboarding();

  if (isCheckingIfHasCompletedOnboarding) {
    return null;
  }

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      {hasCompletedOnboarding === false && (
        <Screen
          name="Onboarding"
          component={Onboarding}
        />
      )}
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUp"
        component={SignUp}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  );
}
