export const changeInput = (eve: any) => {
  const path: (HTMLElement | Document | Window)[] = composedPath(eve.value);

  eve.value.classList.toggle("view");

  if (eve.value.classList.contains("view")) {
    if ("children" in path[1]) {
      path[1].children[0].setAttribute("type", "text");
    }
  } else {
    if ("children" in path[1]) {
      path[1].children[0].setAttribute("type", "password");
    }
  }
};

export const composedPath = (
  el: HTMLElement | null,
): (HTMLElement | Document | Window)[] => {
  let path: (HTMLElement | Document | Window)[] = [];
  while (el) {
    path.push(el);
    if (el.tagName === "HTML") {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
  return [];
};
