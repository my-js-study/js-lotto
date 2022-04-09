export const getLottoNumbers = (number) => {
  const array = Array.from({ length: number });

  return array.map((_) => generateLotto());
};

const generateLotto = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < 7) {
    const number = Math.ceil(Math.random() * 45);
    lottoNumbers.add(number);
  }

  return Array.from(lottoNumbers);
};