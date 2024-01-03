export function scrollTo(ele: HTMLElement, percent: number) {
  const scrollHeight = ele.scrollHeight - ele.clientHeight;
  const scrollToPosition = (scrollHeight * percent) / 100;
  ele.scrollTop = scrollToPosition;
}
