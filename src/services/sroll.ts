export const onInvalidSubmit = () => {
  const element = document.querySelector(".invalid-tooltip");
  if (element) {
    element.scrollIntoView({ block: "center", behavior: "smooth" });
  }
};
