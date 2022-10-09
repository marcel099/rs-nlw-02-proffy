import { View } from "react-native";

import { styles } from "./styles";

interface Props {
  active?: boolean;
}

export function Bullet({ active = false }: Props) {
  return (
    <View style={[
      styles.container,
      active ? styles.active : null,
    ]} />
  );
}
