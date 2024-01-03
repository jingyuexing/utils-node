export function organizationCode(): string {
    const table: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const weight: number[] = [3, 7, 9, 10, 5, 8, 4, 2];
    const random_element: string[] = Array.from({ length: 7 }, () =>
        table[Math.floor(Math.random() * table.length)]
    );
    const value: number[] = random_element.map((item: string) => table.indexOf(item));
    let total = 0;
    for (const ele of value) {
        const idx: number = value.indexOf(ele);
        total += ele * weight[idx];
    }
    const sigIdx: number = 11 - (total % 11);
    random_element.push(table[sigIdx]);
    return random_element.join("");
}
