import { AnyToString } from "../string";

type CSSUnit =
   "px"
   | "rem"
   | "%"
   | "wh"
   | "vh"
   | "vw"
   | "em"
   | "cm"
   | "mm"
   | "Q"
   | "in"
   | "pc"
   | "pt"
   | "ex"
   | "ch"
   | "lh"
   | "vmin"
   | "vmax";
type CSSAnguleUnit = "deg"
type CSSTimeUnit = "s"
type CSSFontSize = "em" | "rem" | "px"
type LengthUnit = "%" | "px" | "em" | "cap"
interface Style {
   accentColor: string;
   alignContent: string;
   alignItems: string;
   alignSelf: string;
   alignmentBaseline: string;
   all: string;
   animation: string;
   animationDelay: string;
   animationDirection: string;
   animationDuration: string;
   animationFillMode: string;
   animationIterationCount: string;
   animationName: string;
   animationPlayState: string;
   animationTimingFunction: string;
   appearance: string;
   aspectRatio: string;
   backdropFilter: string;
   backfaceVisibility: string;
   background: string;
   backgroundAttachment: string;
   backgroundBlendMode: string;
   backgroundClip: string;
   backgroundColor: string;
   backgroundImage: string;
   backgroundOrigin: string;
   backgroundPosition: string;
   backgroundPositionX: string;
   backgroundPositionY: string;
   backgroundRepeat: string;
   backgroundSize: string;
   baselineShift: string;
   blockSize: string;
   border: string;
   borderBlock: string;
   borderBlockColor: string;
   borderBlockEnd: string;
   borderBlockEndColor: string;
   borderBlockEndStyle: string;
   borderBlockEndWidth: string;
   borderBlockStart: string;
   borderBlockStartColor: string;
   borderBlockStartStyle: string;
   borderBlockStartWidth: string;
   borderBlockStyle: string;
   borderBlockWidth: string;
   borderBottom: string;
   borderBottomColor: string;
   borderBottomLeftRadius: string;
   borderBottomRightRadius: string;
   borderBottomStyle: string;
   borderBottomWidth: string;
   borderCollapse: string;
   borderColor: string;
   borderEndEndRadius: string;
   borderEndStartRadius: string;
   borderImage: string;
   borderImageOutset: string;
   borderImageRepeat: string;
   borderImageSlice: string;
   borderImageSource: string;
   borderImageWidth: string;
   borderInline: string;
   borderInlineColor: string;
   borderInlineEnd: string;
   borderInlineEndColor: string;
   borderInlineEndStyle: string;
   borderInlineEndWidth: string;
   borderInlineStart: string;
   borderInlineStartColor: string;
   borderInlineStartStyle: string;
   borderInlineStartWidth: string;
   borderInlineStyle: string;
   borderInlineWidth: string;
   borderLeft: string;
   borderLeftColor: string;
   borderLeftStyle: string;
   borderLeftWidth: string;
   borderRadius: string;
   borderRight: string;
   borderRightColor: string;
   borderRightStyle: string;
   borderRightWidth: string;
   borderSpacing: string;
   borderStartEndRadius: string;
   borderStartStartRadius: string;
   borderStyle: string;
   borderTop: string;
   borderTopColor: string;
   borderTopLeftRadius: string;
   borderTopRightRadius: string;
   borderTopStyle: string;
   borderTopWidth: string;
   borderWidth: string;
   bottom: string;
   boxShadow: string;
   boxSizing: string;
   breakAfter: string;
   breakBefore: string;
   breakInside: string;
   captionSide: string;
   caretColor: string;
   clear: string;
   /** @deprecated */
   clip: string;
   clipPath: string;
   clipRule: string;
   color: string;
   colorInterpolation: string;
   colorInterpolationFilters: string;
   colorScheme: string;
   columnCount: string;
   columnFill: string;
   columnGap: string;
   columnRule: string;
   columnRuleColor: string;
   columnRuleStyle: string;
   columnRuleWidth: string;
   columnSpan: string;
   columnWidth: string;
   columns: string;
   contain: string;
   container: string;
   containerName: string;
   containerType: string;
   content: string;
   counterIncrement: string;
   counterReset: string;
   counterSet: string;
   cssFloat: string;
   cssText: string;
   cursor: string;
   direction: string;
   display: string;
   dominantBaseline: string;
   emptyCells: string;
   fill: string;
   fillOpacity: string;
   fillRule: string;
   filter: string;
   flex: string;
   flexBasis: string;
   flexDirection: string;
   flexFlow: string;
   flexGrow: string;
   flexShrink: string;
   flexWrap: string;
   float: "left" | "right" | "none" | "inline-start" | "inline-end";
   floodColor: string;
   floodOpacity: string;
   font: string;
   fontFamily: string;
   fontFeatureSettings: string;
   fontKerning: string;
   fontOpticalSizing: string;
   fontPalette: string;
   fontSize: string;
   fontSizeAdjust: string;
   fontStretch: string;
   fontStyle: string;
   fontSynthesis: string;
   fontVariant: string;
   fontVariantAlternates: string;
   fontVariantCaps: string;
   fontVariantEastAsian: string;
   fontVariantLigatures: string;
   fontVariantNumeric: string;
   fontVariantPosition: string;
   fontVariationSettings: string;
   fontWeight: string;
   gap: `${number}`;
   grid: string;
   gridArea: string;
   gridAutoColumns: string;
   gridAutoFlow: string;
   gridAutoRows: string;
   gridColumn: string;
   gridColumnEnd: string;
   /** @deprecated This is a legacy alias of `columnGap`. */
   gridColumnGap: string;
   gridColumnStart: string;
   /** @deprecated This is a legacy alias of `gap`. */
   gridGap: string;
   gridRow: string;
   gridRowEnd: string;
   /** @deprecated This is a legacy alias of `rowGap`. */
   gridRowGap: string;
   gridRowStart: string;
   gridTemplate: string;
   gridTemplateAreas: string;
   gridTemplateColumns: string;
   gridTemplateRows: string;
   height: `${number}${LengthUnit}`;
   hyphenateCharacter: string;
   hyphens: string;
   /** @deprecated */
   imageOrientation: string;
   imageRendering: string;
   inlineSize: string;
   inset: string;
   insetBlock: string;
   insetBlockEnd: string;
   insetBlockStart: string;
   insetInline: string;
   insetInlineEnd: string;
   insetInlineStart: string;
   isolation: string;
   justifyContent: string;
   justifyItems: string;
   justifySelf: string;
   left: string;
   readonly length: number;
   letterSpacing: string;
   lightingColor: string;
   lineBreak: string;
   lineHeight: string;
   listStyle: string;
   listStyleImage: string;
   listStylePosition: string;
   listStyleType: string;
   margin: string;
   marginBlock: string;
   marginBlockEnd: string;
   marginBlockStart: string;
   marginBottom: string;
   marginInline: string;
   marginInlineEnd: string;
   marginInlineStart: string;
   marginLeft: string;
   marginRight: string;
   marginTop: string;
   marker: string;
   markerEnd: string;
   markerMid: string;
   markerStart: string;
   mask: string;
   maskClip: string;
   maskComposite: string;
   maskImage: string;
   maskMode: string;
   maskOrigin: string;
   maskPosition: string;
   maskRepeat: string;
   maskSize: string;
   maskType: string;
   maxBlockSize: string;
   maxHeight: string;
   maxInlineSize: string;
   maxWidth: string;
   minBlockSize: string;
   minHeight: string;
   minInlineSize: string;
   minWidth: string;
   mixBlendMode: string;
   objectFit: string;
   objectPosition: string;
   offset: string;
   offsetDistance: string;
   offsetPath: string;
   offsetRotate: string;
   opacity: string;
   order: string;
   orphans: string;
   outline: string;
   outlineColor: string;
   outlineOffset: string;
   outlineStyle: string;
   outlineWidth: string;
   overflow: string;
   overflowAnchor: string;
   overflowClipMargin: string;
   overflowWrap: string;
   overflowX: string;
   overflowY: string;
   overscrollBehavior: string;
   overscrollBehaviorBlock: string;
   overscrollBehaviorInline: string;
   overscrollBehaviorX: string;
   overscrollBehaviorY: string;
   padding: string;
   paddingBlock: string;
   paddingBlockEnd: string;
   paddingBlockStart: string;
   paddingBottom: string;
   paddingInline: string;
   paddingInlineEnd: string;
   paddingInlineStart: string;
   paddingLeft: string;
   paddingRight: string;
   paddingTop: string;
   pageBreakAfter: string;
   pageBreakBefore: string;
   pageBreakInside: string;
   paintOrder: string;
   readonly parentRule: CSSRule | null;
   perspective: string;
   perspectiveOrigin: string;
   placeContent: string;
   placeItems: string;
   placeSelf: string;
   pointerEvents: string;
   position: string;
   printColorAdjust: string;
   quotes: string;
   resize: string;
   right: string;
   rotate: string;
   rowGap: string;
   rubyPosition: string;
   scale: string;
   scrollBehavior: string;
   scrollMargin: string;
   scrollMarginBlock: string;
   scrollMarginBlockEnd: string;
   scrollMarginBlockStart: string;
   scrollMarginBottom: string;
   scrollMarginInline: string;
   scrollMarginInlineEnd: string;
   scrollMarginInlineStart: string;
   scrollMarginLeft: string;
   scrollMarginRight: string;
   scrollMarginTop: string;
   scrollPadding: string;
   scrollPaddingBlock: string;
   scrollPaddingBlockEnd: string;
   scrollPaddingBlockStart: string;
   scrollPaddingBottom: string;
   scrollPaddingInline: string;
   scrollPaddingInlineEnd: string;
   scrollPaddingInlineStart: string;
   scrollPaddingLeft: string;
   scrollPaddingRight: string;
   scrollPaddingTop: string;
   scrollSnapAlign: string;
   scrollSnapStop: string;
   scrollSnapType: string;
   scrollbarGutter: string;
   shapeImageThreshold: string;
   shapeMargin: string;
   shapeOutside: string;
   shapeRendering: string;
   stopColor: string;
   stopOpacity: string;
   stroke: string;
   strokeDasharray: string;
   strokeDashoffset: string;
   strokeLinecap: string;
   strokeLinejoin: string;
   strokeMiterlimit: string;
   strokeOpacity: string;
   strokeWidth: string;
   tabSize: string;
   tableLayout: string;
   textAlign: string;
   textAlignLast: string;
   textAnchor: string;
   textCombineUpright: string;
   textDecoration: string;
   textDecorationColor: string;
   textDecorationLine: string;
   textDecorationSkipInk: string;
   textDecorationStyle: string;
   textDecorationThickness: string;
   textEmphasis: string;
   textEmphasisColor: string;
   textEmphasisPosition: string;
   textEmphasisStyle: string;
   textIndent: string;
   textOrientation: string;
   textOverflow: string;
   textRendering: string;
   textShadow: string;
   textTransform: string;
   textUnderlineOffset: string;
   textUnderlinePosition: string;
   top: string;
   touchAction: string;
   transform: string;
   transformBox: string;
   transformOrigin: string;
   transformStyle: string;
   transition: string;
   transitionDelay: string;
   transitionDuration: string;
   transitionProperty: string;
   transitionTimingFunction: string;
   translate: string;
   unicodeBidi: string;
   userSelect: string;
   verticalAlign: string;
   visibility: string;
   /** @deprecated This is a legacy alias of `alignContent`. */
   webkitAlignContent: string;
   /** @deprecated This is a legacy alias of `alignItems`. */
   webkitAlignItems: string;
   /** @deprecated This is a legacy alias of `alignSelf`. */
   webkitAlignSelf: string;
   /** @deprecated This is a legacy alias of `animation`. */
   webkitAnimation: string;
   /** @deprecated This is a legacy alias of `animationDelay`. */
   webkitAnimationDelay: string;
   /** @deprecated This is a legacy alias of `animationDirection`. */
   webkitAnimationDirection: string;
   /** @deprecated This is a legacy alias of `animationDuration`. */
   webkitAnimationDuration: string;
   /** @deprecated This is a legacy alias of `animationFillMode`. */
   webkitAnimationFillMode: string;
   /** @deprecated This is a legacy alias of `animationIterationCount`. */
   webkitAnimationIterationCount: string;
   /** @deprecated This is a legacy alias of `animationName`. */
   webkitAnimationName: string;
   /** @deprecated This is a legacy alias of `animationPlayState`. */
   webkitAnimationPlayState: string;
   /** @deprecated This is a legacy alias of `animationTimingFunction`. */
   webkitAnimationTimingFunction: string;
   /** @deprecated This is a legacy alias of `appearance`. */
   webkitAppearance: string;
   /** @deprecated This is a legacy alias of `backfaceVisibility`. */
   webkitBackfaceVisibility: string;
   /** @deprecated This is a legacy alias of `backgroundClip`. */
   webkitBackgroundClip: string;
   /** @deprecated This is a legacy alias of `backgroundOrigin`. */
   webkitBackgroundOrigin: string;
   /** @deprecated This is a legacy alias of `backgroundSize`. */
   webkitBackgroundSize: string;
   /** @deprecated This is a legacy alias of `borderBottomLeftRadius`. */
   webkitBorderBottomLeftRadius: string;
   /** @deprecated This is a legacy alias of `borderBottomRightRadius`. */
   webkitBorderBottomRightRadius: string;
   /** @deprecated This is a legacy alias of `borderRadius`. */
   webkitBorderRadius: string;
   /** @deprecated This is a legacy alias of `borderTopLeftRadius`. */
   webkitBorderTopLeftRadius: string;
   /** @deprecated This is a legacy alias of `borderTopRightRadius`. */
   webkitBorderTopRightRadius: string;
   /** @deprecated This is a legacy alias of `boxAlign`. */
   webkitBoxAlign: string;
   /** @deprecated This is a legacy alias of `boxFlex`. */
   webkitBoxFlex: string;
   /** @deprecated This is a legacy alias of `boxOrdinalGroup`. */
   webkitBoxOrdinalGroup: string;
   /** @deprecated This is a legacy alias of `boxOrient`. */
   webkitBoxOrient: string;
   /** @deprecated This is a legacy alias of `boxPack`. */
   webkitBoxPack: string;
   /** @deprecated This is a legacy alias of `boxShadow`. */
   webkitBoxShadow: string;
   /** @deprecated This is a legacy alias of `boxSizing`. */
   webkitBoxSizing: string;
   /** @deprecated This is a legacy alias of `filter`. */
   webkitFilter: string;
   /** @deprecated This is a legacy alias of `flex`. */
   webkitFlex: string;
   /** @deprecated This is a legacy alias of `flexBasis`. */
   webkitFlexBasis: string;
   /** @deprecated This is a legacy alias of `flexDirection`. */
   webkitFlexDirection: string;
   /** @deprecated This is a legacy alias of `flexFlow`. */
   webkitFlexFlow: string;
   /** @deprecated This is a legacy alias of `flexGrow`. */
   webkitFlexGrow: string;
   /** @deprecated This is a legacy alias of `flexShrink`. */
   webkitFlexShrink: string;
   /** @deprecated This is a legacy alias of `flexWrap`. */
   webkitFlexWrap: string;
   /** @deprecated This is a legacy alias of `justifyContent`. */
   webkitJustifyContent: string;
   webkitLineClamp: string;
   /** @deprecated This is a legacy alias of `mask`. */
   webkitMask: string;
   /** @deprecated This is a legacy alias of `maskBorder`. */
   webkitMaskBoxImage: string;
   /** @deprecated This is a legacy alias of `maskBorderOutset`. */
   webkitMaskBoxImageOutset: string;
   /** @deprecated This is a legacy alias of `maskBorderRepeat`. */
   webkitMaskBoxImageRepeat: string;
   /** @deprecated This is a legacy alias of `maskBorderSlice`. */
   webkitMaskBoxImageSlice: string;
   /** @deprecated This is a legacy alias of `maskBorderSource`. */
   webkitMaskBoxImageSource: string;
   /** @deprecated This is a legacy alias of `maskBorderWidth`. */
   webkitMaskBoxImageWidth: string;
   /** @deprecated This is a legacy alias of `maskClip`. */
   webkitMaskClip: string;
   webkitMaskComposite: string;
   /** @deprecated This is a legacy alias of `maskImage`. */
   webkitMaskImage: string;
   /** @deprecated This is a legacy alias of `maskOrigin`. */
   webkitMaskOrigin: string;
   /** @deprecated This is a legacy alias of `maskPosition`. */
   webkitMaskPosition: string;
   /** @deprecated This is a legacy alias of `maskRepeat`. */
   webkitMaskRepeat: string;
   /** @deprecated This is a legacy alias of `maskSize`. */
   webkitMaskSize: string;
   /** @deprecated This is a legacy alias of `order`. */
   webkitOrder: string;
   /** @deprecated This is a legacy alias of `perspective`. */
   webkitPerspective: string;
   /** @deprecated This is a legacy alias of `perspectiveOrigin`. */
   webkitPerspectiveOrigin: string;
   webkitTextFillColor: string;
   /** @deprecated This is a legacy alias of `textSizeAdjust`. */
   webkitTextSizeAdjust: string;
   webkitTextStroke: string;
   webkitTextStrokeColor: string;
   webkitTextStrokeWidth: string;
   /** @deprecated This is a legacy alias of `transform`. */
   webkitTransform: string;
   /** @deprecated This is a legacy alias of `transformOrigin`. */
   webkitTransformOrigin: string;
   /** @deprecated This is a legacy alias of `transformStyle`. */
   webkitTransformStyle: string;
   /** @deprecated This is a legacy alias of `transition`. */
   webkitTransition: string;
   /** @deprecated This is a legacy alias of `transitionDelay`. */
   webkitTransitionDelay: string;
   /** @deprecated This is a legacy alias of `transitionDuration`. */
   webkitTransitionDuration: string;
   /** @deprecated This is a legacy alias of `transitionProperty`. */
   webkitTransitionProperty: string;
   /** @deprecated This is a legacy alias of `transitionTimingFunction`. */
   webkitTransitionTimingFunction: string;
   /** @deprecated This is a legacy alias of `userSelect`. */
   webkitUserSelect: string;
   whiteSpace: string;
   widows: string;
   width: `${number}${LengthUnit}`;
   willChange: string;
   wordBreak: string;
   wordSpacing: string;
   /** @deprecated */
   wordWrap: string;
   writingMode: string;
   zIndex: string;
}

type Booleanish = boolean | "true" | "false"

interface AriaAttributes {
   /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
   "aria-activedescendant"?: string | undefined;
   /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
   "aria-atomic"?: Booleanish | undefined;
   /**
    * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
    * presented if they are made.
    */
   "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
   /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
   /**
    * Defines a string value that labels the current element, which is intended to be converted into Braille.
    * @see aria-label.
    */
   "aria-braillelabel"?: string | undefined;
   /**
    * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
    * @see aria-roledescription.
    */
   "aria-brailleroledescription"?: string | undefined;
   "aria-busy"?: Booleanish | undefined;
   /**
    * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
    * @see aria-pressed @see aria-selected.
    */
   "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;
   /**
    * Defines the total number of columns in a table, grid, or treegrid.
    * @see aria-colindex.
    */
   "aria-colcount"?: number | undefined;
   /**
    * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
    * @see aria-colcount @see aria-colspan.
    */
   "aria-colindex"?: number | undefined;
   /**
    * Defines a human readable text alternative of aria-colindex.
    * @see aria-rowindextext.
    */
   "aria-colindextext"?: string | undefined;
   /**
    * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
    * @see aria-colindex @see aria-rowspan.
    */
   "aria-colspan"?: number | undefined;
   /**
    * Identifies the element (or elements) whose contents or presence are controlled by the current element.
    * @see aria-owns.
    */
   "aria-controls"?: string | undefined;
   /** Indicates the element that represents the current item within a container or set of related elements. */
   "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined;
   /**
    * Identifies the element (or elements) that describes the object.
    * @see aria-labelledby
    */
   "aria-describedby"?: string | undefined;
   /**
    * Defines a string value that describes or annotates the current element.
    * @see related aria-describedby.
    */
   "aria-description"?: string | undefined;
   /**
    * Identifies the element that provides a detailed, extended description for the object.
    * @see aria-describedby.
    */
   "aria-details"?: string | undefined;
   /**
    * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
    * @see aria-hidden @see aria-readonly.
    */
   "aria-disabled"?: Booleanish | undefined;
   /**
    * Indicates what functions can be performed when a dragged object is released on the drop target.
    * @deprecated in ARIA 1.1
    */
   "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;
   /**
    * Identifies the element that provides an error message for the object.
    * @see aria-invalid @see aria-describedby.
    */
   "aria-errormessage"?: string | undefined;
   /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
   "aria-expanded"?: Booleanish | undefined;
   /**
    * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
    * allows assistive technology to override the general default of reading in document source order.
    */
   "aria-flowto"?: string | undefined;
   /**
    * Indicates an element's "grabbed" state in a drag-and-drop operation.
    * @deprecated in ARIA 1.1
    */
   "aria-grabbed"?: Booleanish | undefined;
   /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
   "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
   /**
    * Indicates whether the element is exposed to an accessibility API.
    * @see aria-disabled.
    */
   "aria-hidden"?: Booleanish | undefined;
   /**
    * Indicates the entered value does not conform to the format expected by the application.
    * @see aria-errormessage.
    */
   "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
   /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
   "aria-keyshortcuts"?: string | undefined;
   /**
    * Defines a string value that labels the current element.
    * @see aria-labelledby.
    */
   "aria-label"?: string | undefined;
   /**
    * Identifies the element (or elements) that labels the current element.
    * @see aria-describedby.
    */
   "aria-labelledby"?: string | undefined;
   /** Defines the hierarchical level of an element within a structure. */
   "aria-level"?: number | undefined;
   /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
   "aria-live"?: "off" | "assertive" | "polite" | undefined;
   /** Indicates whether an element is modal when displayed. */
   "aria-modal"?: Booleanish | undefined;
   /** Indicates whether a text box accepts multiple lines of input or only a single line. */
   "aria-multiline"?: Booleanish | undefined;
   /** Indicates that the user may select more than one item from the current selectable descendants. */
   "aria-multiselectable"?: Booleanish | undefined;
   /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
   "aria-orientation"?: "horizontal" | "vertical" | undefined;
   /**
    * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
    * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
    * @see aria-controls.
    */
   "aria-owns"?: string | undefined;
   /**
    * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
    * A hint could be a sample value or a brief description of the expected format.
    */
   "aria-placeholder"?: string | undefined;
   /**
    * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
    * @see aria-setsize.
    */
   "aria-posinset"?: number | undefined;
   /**
    * Indicates the current "pressed" state of toggle buttons.
    * @see aria-checked @see aria-selected.
    */
   "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined;
   /**
    * Indicates that the element is not editable, but is otherwise operable.
    * @see aria-disabled.
    */
   "aria-readonly"?: Booleanish | undefined;
   /**
    * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
    * @see aria-atomic.
    */
   "aria-relevant"?:
   | "additions"
   | "additions removals"
   | "additions text"
   | "all"
   | "removals"
   | "removals additions"
   | "removals text"
   | "text"
   | "text additions"
   | "text removals"
   | undefined;
   /** Indicates that user input is required on the element before a form may be submitted. */
   "aria-required"?: Booleanish | undefined;
   /** Defines a human-readable, author-localized description for the role of an element. */
   "aria-roledescription"?: string | undefined;
   /**
    * Defines the total number of rows in a table, grid, or treegrid.
    * @see aria-rowindex.
    */
   "aria-rowcount"?: number | undefined;
   /**
    * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
    * @see aria-rowcount @see aria-rowspan.
    */
   "aria-rowindex"?: number | undefined;
   /**
    * Defines a human readable text alternative of aria-rowindex.
    * @see aria-colindextext.
    */
   "aria-rowindextext"?: string | undefined;
   /**
    * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
    * @see aria-rowindex @see aria-colspan.
    */
   "aria-rowspan"?: number | undefined;
   /**
    * Indicates the current "selected" state of various widgets.
    * @see aria-checked @see aria-pressed.
    */
   "aria-selected"?: Booleanish | undefined;
   /**
    * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
    * @see aria-posinset.
    */
   "aria-setsize"?: number | undefined;
   /** Indicates if items in a table or grid are sorted in ascending or descending order. */
   "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
   /** Defines the maximum allowed value for a range widget. */
   "aria-valuemax"?: number | undefined;
   /** Defines the minimum allowed value for a range widget. */
   "aria-valuemin"?: number | undefined;
   /**
    * Defines the current value for a range widget.
    * @see aria-valuetext.
    */
   "aria-valuenow"?: number | undefined;
   /** Defines the human readable text alternative of aria-valuenow for a range widget. */
   "aria-valuetext"?: string | undefined;
}

type HTMLEle<K> = K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : K extends keyof SVGElementEventMap ? SVGElementEventMap[K] : never

/**
 * @DOM
 * [element description]
 * @type {K}
 */
export function createElement<K extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap>(
   element: K,
   attributes?: Record<string, string>,
   style?: Partial<Style>
) {
   const ele = document.createElement(element) as HTMLEle<K>;
   if (attributes) {
      Object.keys(attributes).forEach(key => {
         ele.setAttribute(key, `${AnyToString(attributes[key])}`);
      });
   }
   if (style) {
      Object.keys(style).forEach(css => {
         ele.style.setProperty(css as keyof Style, style[css as keyof Style] as string);
      })
   }
   return ele;
}
