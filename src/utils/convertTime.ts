export const convertTime = (time: number) => {
  const sec = Math.ceil(time / 1000);
  const min = Math.floor(sec / 60);

  const convert = `${min} : ${sec - min * 60}`;

  return convert;
};
