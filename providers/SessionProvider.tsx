import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/users";
export interface SessionContextType {
  session: string | null;
  user: User | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  destroySession: () => void;
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: true,
  user: null,
  checkSession: async () => {},
  destroySession: () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const destroySession = () => {
    setSession(null);
  };

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const storedSession = await AsyncStorage.getItem("supabase_session");
      if (storedSession) {
        setSession(storedSession);
        console.log("Session is here");
        //call setuser
      } else {
        setSession(null);
        console.log("No session");
      }
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, isLoading, user, checkSession, destroySession }}
    >
      {children}
    </SessionContext.Provider>
  );
};
