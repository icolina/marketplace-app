export function formatPrice(amount, decimals = 2) {
  if (amount == null || isNaN(amount)) return "0.00";
  
  // Ensure it's a number, fix decimals, then format with commas
  const num = parseFloat(amount).toFixed(decimals);

  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
