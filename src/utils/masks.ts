export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1 $2')
    .replace(/(\d{2} \d)(\d{4})(\d)/, '$1 $2-$3')
    .slice(0, 15);
};
