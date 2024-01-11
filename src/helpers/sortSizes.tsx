export const sortSizes = (a: any, b: any) => {
  const sizes = [
    'XXXS',
    'XXXS/XXS',
    'XXS/XXXS',
    'XXS',
    'XXS/XS',
    'XS/XXS',
    'XS',
    'XS/S',
    'S/SX',
    'S',
    'S/M',
    'M/S',
    'M',
    'M/L',
    'L/M',
    'L',
    'XL/L',
    'L/XL',
    'XL',
    'XL/XXL',
    'XXL/XL',
    'XXL',
    'XXXL/XXL',
    'XXL/XXXL',
    'XXXL',
  ];

  const aIdx = sizes.indexOf(a.name.toUpperCase().trim());
  const bIdx = sizes.indexOf(b.name.toUpperCase().trim());

  if (aIdx < 0) {
    if (!isNaN(a) && !isNaN(b)) {
      return Number(a) - Number(b);
    }
    return !isNaN(a) ? -1 : 1;
  }
  if (bIdx < 0) {
    if (!isNaN(a) && !isNaN(b)) {
      return Number(a) - Number(b);
    }
    return !isNaN(b) ? -1 : 1;
  }
  return aIdx - bIdx;
};
