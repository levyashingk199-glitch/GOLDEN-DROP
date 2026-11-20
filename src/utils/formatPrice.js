export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0';
  return Number(amount).toLocaleString('ru-RU');
};

export const formatCoin = (amount) => {
  return `${formatPrice(amount)} монет`;
};
