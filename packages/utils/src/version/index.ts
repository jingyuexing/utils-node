import { isEmpty } from "../typeis";

interface Version {
  major: number;
  minor: number;
  patch: number;
  build: string;
  tag: string;
}

type VersionString =
  | `${''|'v'}${number}.${number}.${number}`
  | `${''|'v'}${number}.${number}.${number}.${number}`
  | `${''|'v'}${number}.${number}.${number}.${number}-${"alpha" | "beta"}`

// the version regexp
const versionRE =
  "[v=]*([0-9]+)" + // major
  "\\.([0-9]+)" + // minor
  "\\.([0-9]+)" + // patch
  "(-[0-9]+-?)?" + // build
  "[+-]?([a-zA-Z-][a-zA-Z0-9-.:]*)?"; // tag
const _parser = new RegExp(`^\\s*${versionRE}\\s*$`);

/**
 * parse version string
 * @param {VersionString} version the version string
 */
export function version(version: VersionString): (Version & { toString: () => string }) | undefined {
  const _version = version;

  let _versionPart: (Version & { toString: () => string }) | undefined;
  const matches = _parser.exec(_version);
  if (matches) {
    const [, majorStr, minorStr, patchStr, build, tag] = matches;
    const major = parseInt(majorStr, 10);
    const minor = parseInt(minorStr, 10);
    const patch = parseInt(patchStr, 10);

    _versionPart = {
      major,
      minor,
      patch,
      build,
      tag,
      toString() {
        let versionString = [major,minor,patch].join(".");
        if (!isEmpty(build)) {
          versionString += `-${build}`;
        }
        if (!isEmpty(tag)) {
          versionString += `+${tag}`;
        }
        return versionString;
      },
    };
  }
  return _versionPart;
}

/**
 * compare version string
 * @param {VersionString} version1 version string
 * @param {VersionString} version2 version string
 */
export function greatThan(version1: VersionString, version2: VersionString) {
  const v1 = version(version1);
  const v2 = version(version2);
  if (!v1 || !v2) {
    return false;
  }
  const v1List = [v1.major, v1.minor, v1.patch, v1.build];
  const v2List = [v2.major, v2.minor, v2.patch, v2.build];
  for (let i = 0; i < 4; i++) {
    if (v1List[i] > v2List[i]) {
      return true;
    } else if (v1List[i] !== v2List[i]) {
      return false;
    }
  }
  const tag1 = v1.tag || "";
  const tag2 = v2.tag || "";
  return tag1 === tag2 ? null : !tag1 ? true : !tag2 ? false : tag1 > tag2;
}

export function versionValidate(version: string) {
  return _parser.test(version);
}
