import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Stats, Route } from "@/types/users";
import { signInWithSession } from "@/util/setSession";
import { query } from "@/api/db/query";

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
    setUser(null);
    setSession(null);
  };
  const newSession = async (data: string) => {
    const jsonSession = JSON.parse(data);

    const { profile, stats, routes } = await query(jsonSession.user.id);
    const newUser: User = {
      id: profile.id,
      email: profile.email,
      name: profile.full_name,
      ride_count: stats.ride_count,
      eco_score: stats.eco_score,
      total_distance: stats.distance,
      points: stats.points,
      routes: routes!,
    };

    setUser(newUser);
    console.log(jsonSession);
    setSession(data);
  };

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const storedSession = await AsyncStorage.getItem("supabase_session");
      if (storedSession) {
        setSession(storedSession);
        const sessionJson = JSON.parse(storedSession);

        const { profile, stats, routes } = await query(sessionJson.user.id);

        await signInWithSession(sessionJson);

        const newUser: User = {
          id: profile.id,
          email: profile.email,
          name: profile.full_name,
          ride_count: stats.ride_count,
          eco_score: stats.eco_score,
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
