import Router from "next/router";
import { serialize, parse } from "cookie";
import { TOKEN_MAX_AGE, TOKEN_NAME } from "./constants";
import { UserAuthType } from "../types";
import { NextApiRequest } from "next";

export function setAuthCookie(
  res: { setHeader: (arg0: string, arg1: string) => void },
  data: UserAuthType
): void {
  const cookie = serialize(TOKEN_NAME, JSON.stringify(data), {
    httpOnly: true,
    maxAge: TOKEN_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function removeAuthCookie(res: {
  setHeader: (arg0: string, arg1: string) => void;
}): void {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}


export function getAuthCookie(req:NextApiRequest): UserAuthType | undefined {
  try {
    const cookieValue = req.cookies[TOKEN_NAME];
    if(!cookieValue) return undefined;
    if (req.cookies) return JSON.parse(cookieValue);
    const cookies = parse(cookieValue);
    return JSON.parse(cookies[TOKEN_NAME]);
  } catch (err) {
    return undefined;
  }
}

export const logout = async (): Promise<void> => {
  const res = await fetch("/api/auth/logout");
  Router.push("/");
};
