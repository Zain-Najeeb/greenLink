import { useContext } from "react";
import {
  NavigationContextType,
  NavigationContext,
} from "@/providers/NavigationProvider";

export const useNavigation = () => {
  const context = useContext(NavigationContext) as NavigationContextType;

  if (!context) {
    throw new Error("useNavigation must be used within a navigationProvider");
  }

  return context;
};
