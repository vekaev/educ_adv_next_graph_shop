export default function formatMoney(cents = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  };

  const formatter = new Intl.NumberFormat("en-US", options);
  const dollars = cents / 100;

  return formatter.format(dollars);
}
