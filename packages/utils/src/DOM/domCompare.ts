/**
 * Checks if a given HTML element is a child of another element.
 *
 * This function determines if the specified `child` element is a direct or indirect
 * descendant of the `parent` element.
 *
 * @param {HTMLElement} parent - The potential parent element.
 * @param {HTMLElement} child - The element to check if it's a descendant of the parent.
 * @returns {boolean} - Returns `true` if `child` is a descendant of `parent`, otherwise `false`.
 */
export function isChild(parent: HTMLElement, child: HTMLElement) {
   return parent.contains(child)
}

/**
 * Checks if two HTML elements are siblings (i.e., share the same parent element).
 *
 * This function determines if the provided elements have the same parent node
 * and are not the same element.
 *
 * @param {HTMLElement} element1 - The first HTML element to check.
 * @param {HTMLElement} element2 - The second HTML element to check.
 * @returns {boolean} - Returns `true` if the two elements are siblings, otherwise `false`.
 */
function isSibling(element1: HTMLElement, element2: HTMLElement) {
   return element1.parentNode === element2.parentNode && element1 !== element2;
}
/**
 * Checks if an HTML element is visible based on its CSS properties.
 *
 * This function considers the following CSS properties to determine visibility:
 * - `display` is not `none`.
 * - `visibility` is not `hidden`.
 * - `opacity` is not `0`.
 * - The element has a width and height greater than `0`.
 *
 * @param {HTMLElement} element - The HTML element to check for visibility.
 * @returns {boolean} - Returns `true` if the element is visible, otherwise `false`.
 */
export function isVisible(element: HTMLElement) {
   if (!element) return false;
   const style = window.getComputedStyle(element);
   return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
   );
}
/**
 * Checks if the specified element is visible within the viewport.
 *
 * @param {HTMLElement} element - The HTML element to check for visibility.
 * @param {boolean} [fullyInView=false] - Optional. If true, checks if the entire element is within the viewport.
 *                                        If false, checks if any part of the element is within the viewport.
 * @returns {boolean} - Returns true if the element is visible in the viewport based on the provided condition.
 */
export function isVisibleInViewport(element: HTMLElement, fullyInView = false) {
   if (!element) return false;

   const rect = element.getBoundingClientRect();
   const inViewport = fullyInView
      ? rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom > 0 &&
      rect.right > 0;

   return inViewport && isVisible(element);
}

/**
 * Checks if an HTML element is part of the current document.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element is in the document, otherwise `false`.
 */
export function isInDocument(element: HTMLElement) {
   return document.body.contains(element);
}

/**
 * Checks if an HTML element has a specific attribute.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @param {string} attributeName - The name of the attribute to look for.
 * @returns {boolean} - Returns `true` if the element has the specified attribute, otherwise `false`.
 */
export function hasAttribute(element: HTMLElement, attributeName: string) {
   return element.hasAttribute(attributeName);
}

/**
 * Checks if a given HTML element is a direct child of a specified parent element.
 *
 * @param {HTMLElement} parent - The parent HTML element to check against.
 * @param {HTMLElement} child - The child HTML element to verify.
 * @returns {boolean} - Returns `true` if the `child` is a direct child of `parent`, otherwise `false`.
 */
export function isDirectChild(parent: HTMLElement, child: HTMLElement) {
   return child.parentElement === parent;
}

/**
 * Checks if an HTML element is disabled.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element is disabled, otherwise `false`.
 */
export function isDisabled(element: HTMLElement) {
   return element.hasAttribute('disabled');
}

/**
 * Checks if an HTML element has a specific CSS class.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @param {string} className - The CSS class name to look for.
 * @returns {boolean} - Returns `true` if the element has the specified class, otherwise `false`.
 */
export function hasClass(element: HTMLElement, className: string) {
   return element.classList.contains(className);
}

/**
 * Checks if a given HTML element has no child nodes.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element has no child nodes, otherwise `false`.
 */
export function isDOMEmpty(element: HTMLElement) {
   return element.children.length === 0;
}

/**
 * Checks if an HTML element is currently focused.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element is focused, otherwise `false`.
 */
export function isFocused(element: HTMLElement) {
   return document.activeElement === element;
}


/**
 * Checks if an HTML element contains visible text content.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element contains visible text content, otherwise `false`.
 */
export function hasVisibleText(element: HTMLElement) {
   if (!element.textContent) return false
   return element.textContent.trim().length > 0;
}

/**
 * Checks if an HTML element is of a specified tag type.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @param {string} tagName - The tag name to compare (case-insensitive).
 * @returns {boolean} - Returns `true` if the element matches the specified tag type, otherwise `false`.
 */
export function isTagType(element: HTMLElement, tagName: keyof HTMLElementTagNameMap) {
   return element.tagName.toLowerCase() === tagName.toLowerCase();
}

/**
 * Checks if an HTML element has a scrollbar (horizontal or vertical).
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element has a scrollbar, otherwise `false`.
 */
export function hasScrollbar(element: HTMLElement) {
   return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

/**
 * Checks if an HTML element is clickable based on its tag or event listeners.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns `true` if the element is considered clickable, otherwise `false`.
 */
export function isClickable(element: HTMLElement) {
   const clickableTags = ['button', 'a', 'input'];
   return clickableTags.includes(element.tagName.toLowerCase()) || element.hasAttribute('onclick');
}

/**
 * Checks if an HTML element has a specific data attribute.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @param {string} dataAttribute - The data attribute name to look for (without `data-` prefix).
 * @returns {boolean} - Returns `true` if the element has the specified data attribute, otherwise `false`.
 */
export function hasDataAttribute(element: HTMLElement, dataAttribute: string): boolean {
   return element.hasAttribute(`data-${dataAttribute}`) || (dataAttribute in element.dataset);
}


export function enhanceEventListener() {
   const originalAddEventListener = HTMLElement.prototype.addEventListener;
   const eventListenersMap = new WeakMap();

   HTMLElement.prototype.addEventListener = function <K extends keyof HTMLElementEventMap>(event: K, handler: HTMLElementEventMap[K], options?: boolean | AddEventListenerOptions) {
      if (!eventListenersMap.has(this)) {
         eventListenersMap.set(this, new Set());
      }

      const events = eventListenersMap.get(this);
      events.add(event);

      originalAddEventListener.call(this, event, handler as any, options);
   };

   return function hasEventListener(element: HTMLElement, eventName: keyof HTMLElementEventMap): boolean {
      const events = eventListenersMap.get(element);
      return events ? events.has(eventName) : false;
   };
}
