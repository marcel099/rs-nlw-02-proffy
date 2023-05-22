import {
  createStackNavigator, StackScreenProps,
} from '@react-navigation/stack';

import { Confirmation } from '@screens/Confirmation';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type NonAuthStackParamList = {
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
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
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
