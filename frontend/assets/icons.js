import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const icons = {
  home: (props) => <AntDesign name="home" size={24} {...props} />,
  report: (props) => <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="black" {...props} />,
  profile: (props) => <AntDesign name="user" size={24} {...props} />,
};
