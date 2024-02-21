import { useGamepad } from "@/gamepad";
import { createDOM, createElement, referenceString } from "@/index";
import { getNearbyColor, hexToHsl, hlsToRgb, isValidHexColor } from "@/colors";
import { fibExecute } from "@/fun/fibExecute";
const { setOnConnected, onButtonPress, setOnDisconnected, setUpdate } = useGamepad();

// setOnConnected(gamepad => {
//    console.log(gamepad);
//    console.log('游戏手柄已经连接！');
// });
// onButtonPress((button, index) => {
//    console.log(button, `第 ${index} 个按钮`);
// });
// setOnDisconnected(gamepad => {
//    console.log('连接断开');
// });

// setUpdate(() => {

// });

// const div = document.getElementById("div")

// createDOM(div as HTMLElement, {
//    tag: "div",
//    children: [
//       {
//          tag: "a",
//          attributes: {
//             href: "",
//          },
//          children: "some text"
//       },
//       {
//          tag: "a",
//          attributes: {
//             href: "",
//          },
//          children: "some text"
//       },
//       {
//          tag: "a",
//          attributes: {
//             href: "",
//          },
//          children: "some text"
//       },
//       {
//          tag: "a",
//          attributes: {
//             href: "",
//          },
//          children: "some text"
//       }
//    ]
// })

// interface MenuNode {
//    id: number;
//    parent: string;
//    title: string;
// }
// function toTree(menus: MenuNode[]) {
//    menus = menus.filter((item) => item != null && item !== undefined)
//    const mappings = Object.create(null)
//    const tree: (MenuNode & { children: MenuNode[] })[] = []
//    const idToString = (id?: number | string) => id ? String(id) : ""
//    menus.forEach((item) => {
//       if (item) {
//          mappings[idToString(item.id)] = { ...item, children: [] }
//       }
//    })
//    menus.forEach((item) => {
//       if (item && !item.parent) {
//          tree.push(mappings[idToString(item.id)])
//       } else {
//          const parent = mappings[idToString(item.parent)]
//          if (parent) {
//             parent.children.push(mappings[idToString(item.id)])
//          }
//       }
//    })
//    return tree
// }

// toTree([
//    {
//       id: 1,
//       parent: "1",
//       title: ""
//    }
// ])

type ColorsName = "primary" | "secondary" | "error" | "warning" | "info" | "success";
type Palette = {
   [key in ColorsName]: {
      main: string;
      light: string;
      dark: string;
   };
};
type ThemeColors = {
   [key in ColorsName]: string;
};

export function generatorPalette(themeColors: ThemeColors): Partial<Palette> {
   const palette: Partial<Palette> = {};
   Object.keys(themeColors).forEach((value) => {
      if (isValidHexColor(themeColors[value as ColorsName])) {
         const [h, s, l] = hexToHsl(themeColors[value as ColorsName].replace("#", ""));
         function genDark(h: number, s: number, l: number) {
            if (l > 43) {
               l -= 10;
            } else {
               l = 43;
            }
            if (h + 10 < 360) {
               h += 9.6;
            }
            return [h, s, l];
         }
         const dark = genDark(h, s, l);
         palette[value as ColorsName] = {
            light: `hsl(${h}deg ${s}% ${l}% / 46%)`,
            dark: `hsl(${dark[0]}deg ${dark[1]}% ${dark[2]}%)`,
            main: `hsl(${h}deg ${s}% ${l}%)`,
         };
      }
   });
   return palette;
}
const palette = generatorPalette({
   primary: "#9b55fd",
   secondary: "#0c0b0f",
   warning: "#dda622",
   success: "#5aaf1b",
   info: "#35a7e0",
   error: "#e76468",
});

const div = document.getElementById("div");

console.log(palette);

Object.keys(palette).forEach((color) => {
   const _colors = palette[color as ColorsName];
   const d = createElement("div");
   const lightColorBlock = createElement("div", undefined, {
      width: "40px",
      height: "20px",
      backgroundColor: _colors?.light,
   }) as HTMLDivElement;
   const darkColorBlock = createElement("div", undefined, {
      width: "40px",
      height: "20px",
      backgroundColor: _colors?.dark,
   }) as HTMLDivElement;
   const defaultColorBlock = createElement("div", undefined, {
      width: "40px",
      height: "20px",
      backgroundColor: _colors?.main,
   }) as HTMLDivElement;
   d.appendChild(lightColorBlock);
   d.appendChild(darkColorBlock);
   d.appendChild(defaultColorBlock);
   div?.appendChild(d);
});

function out(prev: number, order: number) {
   console.log(`some: ${prev} order:${order}`);
   return 1 + prev;
}
function add(prev: number, order: number): number {
   if (order <= 2) {
      return 1;
   }
   return prev + order;
}

function generateFibonacciSequence(length: number): number[] {
   const fibFunc = fibExecute<number, number>(...Array.from({ length }, () => add));
   const sequence: number[] = [];
   let currentValue = 1;

   for (let i = 0; i < length; i++) {
      currentValue = fibFunc(currentValue);
      sequence.push(currentValue);
   }

   return sequence;
}
type AutoGen<T extends object> = {
   [K in keyof T]: `${K & (string | number)}={${K & (string | number)}}`
}
const generatorByEntity = <T extends object>(entity: T): AutoGen<T> => {
   const result = {} as AutoGen<T>;
   Object.keys(entity).forEach(key => {
      (result as any)[key] = `${key}={${key}}`
   })
   return result
}
const ref = {
   table: "user",
   ...generatorByEntity({ name: "", id: "", email: "", password: "" }),
   create: "insert @table ({id},{name},{email})",
   byId: "where @id",
   nameIn: "`name` in ({values})",
   emailIn: "`email` in ({values})",
   byName: "where @name",
   like: "like {values}",
   likeEmail: "`email` @like",
   '😍': "like emoji 😎 😍 😘 🤩 😯 😛 🤑",
   likeName: "`name` @like",
   byEmail: "where @email",
   我: "select * from @table where name='我'",
   limit: "limit {size}",
   offset: "offset {page}",
   pagination: "@offset @limit",
   byNameAndEmail: "where @name and @email",
   select: "select * from @table",
   selectEmail: "select email from @table @byEmail",
   queryByName: "where @name",
   queryByEmail: "where @name",
   update: "update @table set @id,@name,@email",
   query: "select * from @table where @id",
   updateByName: "@update @queryByName",
   groupEmail: "group by `email`",
   groupName: "group by `name`",
   createById: "@create @byId",
   fuzzyMatchingEmail: "@select where @likeEmail @pagination",
   fuzzyMatchingName: "@select where @likeName @pagination",
   emailList: "@select @queryByEmail @groupEmail @pagination",
   nameList: "@select @queryByName @groupName @pagination",
   findName: "@select @byName",
   selectById: "@select @byId @pagination",
   findMine: "@我",
   findEmoji: "@😍"
}

const [refrence,parser] = referenceString(ref)
console.log(refrence)
console.table({
   parser:parser(ref.groupEmail),
})

console.log(generateFibonacciSequence(20))

