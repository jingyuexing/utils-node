interface Cookie {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: Date;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

class CookieJar {
  private cookies: Map<string, Cookie>;

  constructor() {
    this.cookies = new Map<string, Cookie>();
  }

  public setCookie(cookie: Cookie): void {
    this.cookies.set(cookie.name, cookie);
  }

  public getCookies(url: string): string {
    const host = new URL(url).host;
    const validCookies: Array<Cookie> = [];

    for (const cookie of this.cookies.values()) {
      const domainMatch = cookie.domain === host || cookie.domain === `.${host}`;
      const pathMatch = url.startsWith(cookie?.path ? cookie.path : "");
      const now = new Date();

      if (domainMatch && pathMatch && (!cookie.expires || cookie.expires > now)) {
        validCookies.push(cookie);
      }
    }

    return validCookies.map(c => {
      let cookieStr = `${c.name}=${c.value}`;

      if (c.expires) {
        cookieStr += `; Expires=${c.expires.toUTCString()}`;
      }

      if (c.secure) {
        cookieStr += '; Secure';
      }

      if (c.httpOnly) {
        cookieStr += '; HttpOnly';
      }

      if (c.sameSite) {
        cookieStr += `; SameSite=${c.sameSite}`;
      }

      return cookieStr;
    }).join('; ');
  }

  public getCookie(name: string): string | undefined {
    const cookie = this.cookies.get(name)
    if(cookie?.expires){
      if(cookie.expires.getTime() <= Date.now()){
        return cookie.value
      }
    }
    return undefined;
  }

  public setCookieValue(name: string, value: string): void {
    const cookie = this.cookies.get(name)
    if(cookie){
      cookie.value = value
    }
    this.cookies.set(name, { name, value, domain: '', path: '' });
  }

  public toString(url: string): string {
    const host = new URL(url).host;
    const now = new Date();
    const validCookies: Array<Cookie> = [];

    for (const cookie of this.cookies.values()) {
      const domainMatch = cookie.domain === host || cookie.domain === `.${host}`;
      const pathMatch = url.startsWith(cookie?.path ? cookie.path : "");

      if (domainMatch && pathMatch && (!cookie.expires || cookie.expires > now)) {
        validCookies.push(cookie);
      }
    }

    return validCookies.map(c => {
      let cookieStr = `${c.name}=${c.value}`;

      if (c.expires) {
        cookieStr += `; Expires=${c.expires.toUTCString()}`;
      }

      if (c.secure) {
        cookieStr += '; Secure';
      }

      if (c.httpOnly) {
        cookieStr += '; HttpOnly';
      }

      if (c.sameSite) {
        cookieStr += `; SameSite=${c.sameSite}`;
      }

      return cookieStr;
    }).join('; ');
  }
  public static fromString(cookieString: string): CookieJar {
    const jar = new CookieJar();

    cookieString.split(';').forEach(cookie => {
      const [name, value, ...attributes] = cookie.split('=');
      const cookieObj: Cookie = { name, value };

      attributes.forEach(attr => {
        const [key, val] = attr.trim().split('=');
        if (key.toLowerCase() === 'expires') {
          cookieObj.expires = new Date(val);
        } else if (key.toLowerCase() === 'path') {
          cookieObj.path = val;
        } else if (key.toLowerCase() === 'domain') {
          cookieObj.domain = val;
        } else if (key.toLowerCase() === 'httponly') {
          cookieObj.httpOnly = true;
        } else if (key.toLowerCase() === 'secure') {
          cookieObj.secure = true;
        } else if (key.toLowerCase() === 'samesite') {
          cookieObj.sameSite = val as 'Strict' | 'Lax' | 'None';
        }
      });

      jar.setCookie(cookieObj);
    });

    return jar;
  }
  public static add(jar1: CookieJar, jar2: CookieJar): CookieJar {
    const newJar = new CookieJar();
    newJar.cookies = new Map([...jar1.cookies, ...jar2.cookies]);
    return newJar;
  }

  public static concat(jar1: CookieJar, jar2: CookieJar): CookieJar {
    return CookieJar.add(jar1, jar2);
  }

  public static merge(jar1: CookieJar, jar2: CookieJar): CookieJar {
    const newJar = new CookieJar();

    for (const cookie of jar1.cookies.values()) {
      const key = `${cookie.domain}${cookie.path}${cookie.name}`;
      newJar.cookies.set(key, cookie);
    }

    for (const cookie of jar2.cookies.values()) {
      const key = `${cookie.domain}${cookie.path}${cookie.name}`;
      if (!newJar.cookies.has(key)) {
        newJar.cookies.set(key, cookie);
      }
    }

    return newJar;
  }

  public static mergeAll(jars: Array<CookieJar>): CookieJar {
    const newJar = new CookieJar();

    for (const jar of jars) {
      for (const cookie of jar.cookies.values()) {
        if (!newJar.cookies.has(cookie.name)) {
          newJar.cookies.set(cookie.name, cookie);
        }
      }
    }

    return newJar;
  }

  public static union(jar1: CookieJar, jar2: CookieJar): CookieJar {
    const newJar = new CookieJar();

    for (const cookie of jar1.cookies.values()) {
      newJar.cookies.set(cookie.name, cookie);
    }

    for (const cookie of jar2.cookies.values()) {
      if (!newJar.cookies.has(cookie.name)) {
        newJar.cookies.set(cookie.name, cookie);
      }
    }

    return newJar;
  }

  public static unionAll(jars: Array<CookieJar>): CookieJar {
    const newJar = new CookieJar();

    for (const jar of jars) {
      for (const cookie of jar.cookies.values()) {
        // const key = `${cookie.domain}${cookie.path}${cookie.name}`;
       if (!newJar.cookies.has(cookie.name)) {
          newJar.cookies.set(cookie.name, cookie);
        }
      }
    }

    return newJar;
  }
}
