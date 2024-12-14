const checkoutButton = document.querySelector('.checkout-button');

checkoutButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission

  const cardName = document.getElementById('card-name').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;
  const billingAddress = document.getElementById('billing-address').value;

  if (!cardName || !cardNumber || !expiryDate || !cvv || !billingAddress) {
    alert('Please fill in all required fields.');
  } else {
    // Here, you would typically send the payment information to a server-side script
    // for processing. For now, we'll just display a success message:
    alert('Thank you for your purchase!');
    // You can also redirect to a confirmation page or other desired action here.
  }
});