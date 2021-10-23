export const fetchOrders = () => () => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {});
};
