type Delimiter = ',' | ';' | '，' | '；' | '|' | ' ' | '\t' | '$' | '#' | '.' | '~' | '-' | '_';
function guessDelimiter(line: string): Delimiter | null {
   const possibleDelimiters: Delimiter[] = [',', ';', '，', '；', '|', ' ', '\t', '$', '#', '.', '~', '-', '_'];
   var delimiter: Delimiter | null = null;
   for (var i = 0; i < possibleDelimiters.length; i++) {
      const parts = line.split(possibleDelimiters[i]);
      if (parts.length > 1) {
         delimiter = possibleDelimiters[i];
         break;
      }
   }
   return delimiter;
}

/**
 * CSV text parse
 * @param {string} text [description]
 */
export function* CSV(text: string) {
   for (const line of text.split('\n')) {
      const delimiter = guessDelimiter(line);
      if (delimiter != null) {
         yield line.split(delimiter);
      }
   }
}
