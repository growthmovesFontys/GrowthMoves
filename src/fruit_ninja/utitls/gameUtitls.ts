export const fruitsModels = [
  { model: "banana/Banana_01", material: "banana/Banana_01", name: "banana" },
  { model: "apple/Apple_01", material: "apple/Apple_01", name: "apple" },
  {
    model: "bomb/bomb",
    material: "bomb/bomb",
    name: "bomb",
  },
];

export const generateRandomPosition = (min: number, max: number) =>
  Math.round(Math.random() * (max - min)) + min;

const isAndroid = () => /Android/i.test(navigator.userAgent);

const isiOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export const isMobile = () => isAndroid() || isiOS();

export const updateStartButton = () => {
  document.getElementsByTagName("button")[0].innerText = "Start";
  document.getElementsByTagName("button")[0].disabled = false;
};
