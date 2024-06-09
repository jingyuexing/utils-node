import { isEmpty } from "../typeis";

interface Version {
   major: number;
   minor: number;
   patch: number;
   build: string;
   tag: string;
}

interface Logic {
   /**
    * compare version is great than other version
    * @param  {VersionString} version version string
    * @return {boolean}               if version less than then return `true` otherwise is `false`
    */
   gt(version: VersionString): boolean;
   /**
    * compare version is less than other version
    * @param  {VersionString} version version string
    * @return {boolean}               if version less than then return `true` otherwise is `false`
    */
   lt(version: VersionString): boolean;
   /**
    * compare version is great than or equal other version
    * @param  {VersionString} version version string
    * @return {boolean}               if version great than or equal then return `true` otherwise is `false`
    */
   ge(version: VersionString): boolean;
   /**
    * compare version is less than or equal other version
    * @param  {VersionString} version version string
    * @return {boolean}               if version less than then return `true` otherwise is `false`
    */
   le(version: VersionString): boolean;
   /**
    * compare version is equal other version
    * @param  {VersionString} version version string
    * @return {boolean}               if version equal then return `true` otherwise is false
    */
   eq(version: VersionString): boolean;
}

type VersionString =
   | `${number}.${number}.${number}`
   | `${number}.${number}.${number}.${number}`
   | `${number}.${number}.${number}.${number}-${"alpha" | "beta"}`
   | `v${number}.${number}.${number}`
   | `v${number}.${number}.${number}.${number}`
   | `v${number}.${number}.${number}.${number}-${"alpha" | "beta"}`;

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
export function version(version: VersionString): (Version & { toString: () => string } & Logic) | undefined {
   const _version = version;

   let _versionPart: (Version & { toString: () => string } & Logic) | undefined;
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
            let versionString = [major, minor, patch].join(".");
            if (!isEmpty(build)) {
               versionString += `-${build}`;
            }
            if (!isEmpty(tag)) {
               versionString += `+${tag}`;
            }
            return versionString;
         },
         ge(version: VersionString) {
            return compareVersion(this.toString() as VersionString, version) >= 0
         },
         gt(version: VersionString) {
            return compareVersion(this.toString() as VersionString, version) > 0
         },
         lt(version) {
            return compareVersion(this.toString() as VersionString, version) < 0

         },
         le(version) {
            return compareVersion(this.toString() as VersionString, version) <= 0

         },
         eq(version) {
            return compareVersion(this.toString() as VersionString, version) == 0
         },
      };
   }
   return _versionPart;
}

/**
 * compare version string
 * @param {VersionString} version1 version string
 * @param {VersionString} version2 version string
 * @returns {number} -1 if version1 < version2, 0 if version1 == version2, 1 if version1 > version2
 */
export function compareVersion(version1: VersionString, version2: VersionString) {
   const v1 = version(version1);
   const v2 = version(version2);
   if (!v1 || !v2) {
      throw new Error('Invalid version string');
   }

   const v1List = [v1.major, v1.minor, v1.patch, v1.build];
   const v2List = [v2.major, v2.minor, v2.patch, v2.build];

   for (let i = 0; i < 4; i++) {
      if (v1List[i] > v2List[i]) {
         return 1;
      } else if (v1List[i] < v2List[i]) {
         return -1;
      }
   }

   const tag1 = v1.tag || "";
   const tag2 = v2.tag || "";

   if (tag1 === tag2) {
      return 0;
   } else if (!tag1) {
      return 1;
   } else if (!tag2) {
      return -1;
   } else {
      return tag1 > tag2 ? 1 : -1;
   }
}

export function versionValidate(version: string) {
   return _parser.test(version);
}
/**
 * Compares if version1 is greater than version2.
 *
 * This API is deprecated. It is recommended to use
 *
 * ```ts
 * version(version_a)?.gt(version_b)
 * ```
 * @deprecated
 * @param {VersionString} version1 The first version string to compare.
 * @param {VersionString} version2 The second version string to compare.
 * @returns {boolean} Returns true if version1 is greater than version2, otherwise false. Returns undefined if the version comparison fails.
 */
export function greatThan(version1: VersionString, version2: VersionString) {
   return version(version1)!.gt(version2)
}
