/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as alert from "../alert.js";
import type * as donation from "../donation.js";
import type * as goal from "../goal.js";
import type * as http from "../http.js";
import type * as target from "../target.js";
import type * as user from "../user.js";
import type * as yoomoney from "../yoomoney.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  alert: typeof alert;
  donation: typeof donation;
  goal: typeof goal;
  http: typeof http;
  target: typeof target;
  user: typeof user;
  yoomoney: typeof yoomoney;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
