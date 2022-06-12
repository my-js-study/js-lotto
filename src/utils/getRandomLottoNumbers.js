const generateLotto = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < 7) {
    const number = Math.ceil(Math.random() * 45);
    lottoNumbers.add(number);
  }

  return Array.from(lottoNumbers);
};

export const getLottoNumbers = (number) =>
  Array.from({ length: number }, () => generateLotto());
