export function cleanCode(codestring:""){
    return codestring
    .replace(/\\\*.*\*\//,'')
    .replace(/\/\/.*$/,"")
    .replace(/\s{2,}/,'')
    .replace(/console.*\)$/,"")
}