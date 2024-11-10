/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)/dashboard` | `/(app)/dashboard/account` | `/(app)/dashboard/home` | `/(app)/dashboard/map` | `/(app)/dashboard/navigate` | `/(auth)/users` | `/(auth)/users/forgotPassword` | `/(auth)/users/signIn` | `/(auth)/users/signUp` | `/_sitemap` | `/dashboard` | `/dashboard/account` | `/dashboard/home` | `/dashboard/map` | `/dashboard/navigate` | `/users` | `/users/forgotPassword` | `/users/signIn` | `/users/signUp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
