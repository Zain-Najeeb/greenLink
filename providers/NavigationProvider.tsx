// import React, { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { RouteInformation } from "@/types/locationTypes";
// import { User } from "@/types/users";
// export interface NavigationProvider {
//   source: string | null;
//   destination: string | null;
//   addresses: string[] | null;
//   routeInfo: RouteInformation | null;
//   step: number | null;
//   trigger: () => void;
//   active: boolean;
// }

// export const NavigationProvider = createContext<NavigationProvider>({
//   source: null,
//   destination: null,
//   addresses: null,
//   routeInfo: null,
//   step: null,
//   trigger: () => {},
//   active: false,
// });

// export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return (
//     <NavigationProvider.Provider
//       value={{
//         source: "",
//         destination: "",
//       }}
//     >
//       {children}
//     </NavigationProvider.Provider>
//   );
// };
// s;
