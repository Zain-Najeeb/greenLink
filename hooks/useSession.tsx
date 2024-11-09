import { useContext } from "react";
import {
  SessionContextType,
  SessionContext,
} from "@/providers/SessionProvider";

export const useSession = () => {
  const context = useContext(SessionContext) as SessionContextType;

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
