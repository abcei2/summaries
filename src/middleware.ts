import { TOKEN_NAME } from "@/utils/constants";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { UserAuthType } from "./types";

const isValidPath = (path: string, paths: string[], equals = false) => {
  return paths.reduce((acc, curr) => {
    if (curr == path) return true;
    if (!equals && curr != "/" && path.startsWith(curr)) return true;
    return acc;
  }, false);
};

export function middleware(req: NextRequest) {
  const noUserPaths = ["/login", "/signup"];
  const subscribedPaths = [
    "/",
    "/profile",
    "/search",
    "/mylibrary",
    "/books/details",
  ];
  const adminPaths = [
    ...subscribedPaths,
    "/summary",
  ];
  const fileFormats = [".pdf", ".docx", ".jpg", ".png", ".jpeg"];

  const nextSlashUrl =
    req.nextUrl.pathname != "/"
      ? NextResponse.redirect(new URL("/", req.nextUrl))
      : NextResponse.next();

  if (fileFormats.find((format) => req.nextUrl.pathname.endsWith(format)))
    return NextResponse.next();
  const cookieValue = req.cookies.get(TOKEN_NAME)?.value;
  if (cookieValue) {
    let userAuth: UserAuthType | null = null;

    try {
      userAuth = cookieValue ? JSON.parse(cookieValue) : null;
    } catch (error) {
      console.log(error);
    }
    if (!userAuth) {
      if (!isValidPath(req.nextUrl.pathname, noUserPaths, true)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
    } else {
      if (!userAuth.is_superuser && !userAuth.is_subscribed)
        return nextSlashUrl;

      if (
        userAuth.is_superuser &&
        !isValidPath(req.nextUrl.pathname, adminPaths)
      )
        return nextSlashUrl;

      if (
        !userAuth.is_superuser && userAuth.is_subscribed &&
        !isValidPath(req.nextUrl.pathname, subscribedPaths)
      )
        return nextSlashUrl;
    }
  } else {
    if (!isValidPath(req.nextUrl.pathname, noUserPaths, true))
      return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|favicon.ico|api).*)"],
};
