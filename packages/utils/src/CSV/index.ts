type Delimiter = ',' | ';' | '，' | '；' | '|' | ' ' | '\t' | '$' | '#' | '.' | '~' | '-' | '_';
function guessDelimiter(line: string): Delimiter | null {
   var possibleDelimiters: Delimiter[] = [',', ';', '，', '；', '|', ' ', '\t', '$', '#', '.', '~', '-', '_'];
   var delimiter: Delimiter | null = null;
   for (var i = 0; i < possibleDelimiters.length; i++) {
      var parts = line.split(possibleDelimiters[i]);
      if (parts.length > 1) {
         delimiter = possibleDelimiters[i];
         break;
      }
   }
   return delimiter;
}

export function* CSV(text: string) {
   for (let line of text.split('\n')) {
      let delimiter = guessDelimiter(line);
      if (delimiter != null) {
         yield line.split(delimiter);
      }
   }
}
