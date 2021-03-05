export const formatPrice = (price = 0) => new Intl.NumberFormat("en-IN").format(price);
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
