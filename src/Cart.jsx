import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from './store';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyDiscount = (dvalue) => {
    if (dvalue > 100) return; // Prevent discount from exceeding 100%
    setDiscountPercentage(dvalue);
  };

  const handleApplyCoupon = () => {
    switch (couponCode) {
      case 'SAVE10':
        setCouponDiscount(10);
        break;
      case 'SAVE20':
        setCouponDiscount(20);
        break;
      case 'SAVE30':
        setCouponDiscount(30);
        break;
      default:
        alert('Invalid coupon code');
        setCouponDiscount(0);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (total * discountPercentage) / 100;
    const finalTotal = total - discountAmount - couponDiscount;

    return {
      total: parseFloat(total.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      couponDiscount: parseFloat(couponDiscount.toFixed(2)),
      finalTotal: parseFloat(finalTotal.toFixed(2)),
    };
  };

  const { total, discountAmount, finalTotal } = calculateTotal();

  return (
    <>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
                <button onClick={() => dispatch(decrementQuantity(item))}>-</button>
                <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total before discounts: ${total.toFixed(2)}</p>
          <div>
            <button onClick={() => handleApplyDiscount(10)}>Apply 10% Discount</button>
            <button onClick={() => handleApplyDiscount(20)}>Apply 20% Discount</button>
            <button onClick={() => handleApplyDiscount(30)}>Apply 30% Discount</button>
          </div>
          <p>Discount Percentage Applied: {discountPercentage}%</p>
          <p>Discount Amount: ${discountAmount.toFixed(2)}</p>
          
          <div>
            <input 
              type="text" 
              placeholder="Enter coupon code" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
            />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
          </div>
          <p>Coupon Discount: ${couponDiscount.toFixed(2)}</p>
          <p>Final Amount after Discount: ${finalTotal.toFixed(2)}</p>
        </>
      )}
    </>
  );
};

export default Cart;
