export const formattedValue = (price: number, currency?: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.toUpperCase() || 'USD',
    maximumFractionDigits: 2,
  });
  return formatter.format(price);
};

export const formattedTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toFixed();
  const s = (seconds - Math.trunc(seconds / 60) * 60).toFixed();

  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
