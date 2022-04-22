export const getLottoNumbers = (number) => {
  return Array.from({ length: number }, (_) => generateLotto());
};

const generateLotto = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < 7) {
    const number = Math.ceil(Math.random() * 45);
    lottoNumbers.add(number);
  }

  return Array.from(lottoNumbers);
};
