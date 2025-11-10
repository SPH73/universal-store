import type { H3Event } from "h3";
import { getCookie, setCookie, deleteCookie } from "h3";

export function isAdmin(event: H3Event): boolean {
  return getCookie(event, "admin_session") === "1";
}

export function startAdminSession(event: H3Event) {
  setCookie(event, "admin_session", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function endAdminSession(event: H3Event) {
  deleteCookie(event, "admin_session", { path: "/" });
}
