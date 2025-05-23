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
import type * as clerk from "../clerk.js";
import type * as constants from "../constants.js";
import type * as files from "../files.js";
import type * as follows from "../follows.js";
import type * as http from "../http.js";
import type * as notification from "../notification.js";
import type * as stripe from "../stripe.js";
import type * as thumbnails from "../thumbnails.js";
import type * as users from "../users.js";
import type * as util from "../util.js";
import type * as vision from "../vision.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clerk: typeof clerk;
  constants: typeof constants;
  files: typeof files;
  follows: typeof follows;
  http: typeof http;
  notification: typeof notification;
  stripe: typeof stripe;
  thumbnails: typeof thumbnails;
  users: typeof users;
  util: typeof util;
  vision: typeof vision;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
