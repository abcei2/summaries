import { TOKEN_NAME } from "@/utils/constants";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const validatePath = (path: string, paths: string[], equals = false) => {
  return paths.reduce((acc, curr) => {
    if (curr == path) return true;
    if (!equals && curr != "/" && path.startsWith(curr)) return true;
    return acc;
  }, false);
};

export function middleware(req: NextRequest) {
  const noUserPaths = ["/login", "/signup"];
  const userPaths = ["/", "/profile", "/search"];
  const fileFormats = [".pdf", ".docx", ".jpg", ".png", ".jpeg"];

  if (fileFormats.find((format) => req.nextUrl.pathname.endsWith(format)))
    return NextResponse.next();
  const cookieValue = req.cookies.get(TOKEN_NAME)?.value;
  if (cookieValue) {
    let userAuth = null;

    try {
      userAuth = cookieValue ? JSON.parse(cookieValue) : null;
    } catch (error) {
      console.log(error);
    }
    if (!userAuth) {
      if (!validatePath(req.nextUrl.pathname, noUserPaths, true)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
    } else {
      if (!validatePath(req.nextUrl.pathname, userPaths))
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else {
    if (!validatePath(req.nextUrl.pathname, noUserPaths, true))
      return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|favicon.ico|api).*)"],
};
