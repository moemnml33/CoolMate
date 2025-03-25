/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/chores` | `/chores`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/expenses` | `/expenses`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/groceries` | `/groceries`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/chores` | `/chores`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/expenses` | `/expenses`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/groceries` | `/groceries`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/chores${`?${string}` | `#${string}` | ''}` | `/chores${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/expenses${`?${string}` | `#${string}` | ''}` | `/expenses${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/groceries${`?${string}` | `#${string}` | ''}` | `/groceries${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/chores` | `/chores`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/expenses` | `/expenses`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/groceries` | `/groceries`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
