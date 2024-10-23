export function toggleElement<E extends HTMLElement>(
   ele: E,
   callback: (target: E) => boolean
): () => boolean {
   const originToggle = (): boolean => {
      const result = callback(ele);

      return result;
   };

   originToggle();

   return originToggle;
}
