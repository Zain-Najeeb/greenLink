/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/_sitemap` | `/users/forgotPassword` | `/users/signIn` | `/users/signUp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
