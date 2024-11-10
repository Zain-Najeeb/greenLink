import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Stats, Route } from "@/types/users";
import { signInWithSession } from "@/util/setSession";
import { getPointsData } from "@/api/users/getProfileData";
import { getStatsData } from "@/api/users/getStatsData";
import { getRoutesData } from "@/api/users/getRoutes";
export interface SessionContextType {
  session: string | null;
  user: User | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  destroySession: () => void;
  newSession: (data: string) => void;
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: true,
  user: null,
  checkSession: async () => {},
  destroySession: () => {},
  newSession: () => {},
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
  const newSession = (data: string) => {
    setSession(data);
  };

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const storedSession = await AsyncStorage.getItem("supabase_session");
      if (storedSession) {
        setSession(storedSession);
        const sessionJson = JSON.parse(storedSession);
        // console.log(sessionJson);
        const profile = await getPointsData(sessionJson.user.id);
        const stats = await getStatsData(sessionJson.user.id);
        const routes = await getRoutesData(sessionJson.user.id);

        await signInWithSession(sessionJson);

        const newUser: User = {
          email: profile.email,
          name: profile.full_name,
          ride_count: stats.ride_count,
          eco_score: stats.eco_core,
          total_distance: stats.distance,
          points: stats.points,
          routes: routes!,
        };

        setUser(newUser);
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
      value={{
        session,
        isLoading,
        user,
        checkSession,
        destroySession,
        newSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
