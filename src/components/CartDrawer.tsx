import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Gift } from 'lucide-react';
import { CartItem } from '../types/ayurveda';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round(subtotal * appliedDiscount);
  const freeShippingThreshold = 75;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 8;
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'RITUAL15') {
      setAppliedDiscount(0.15);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "RITUAL15" for 15% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !shippingAddress) return;

    const ref = `AYUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setOrderComplete(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#242B26]/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FFFFFF] h-full shadow-[0px_20px_40px_-8px_rgba(31,61,43,0.2)] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E2DDD4] flex items-center justify-between bg-[#F9F8F5]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-[#1F3D2B]">
              Your Prescribed Ritual Kit
            </span>
            <span className="text-xs text-[#5E7A68] tabular-nums">
              ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#424843] hover:text-[#1F3D2B] hover:bg-[#EBE6DF] rounded-lg cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#EEF6ED] border-b border-[#cbead4] text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-2 text-[#1F3D2B] font-medium">
              <Gift className="w-4 h-4 text-[#496453] shrink-0" />
              <span>Complimentary Apothecary Shipping Unlocked!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#424843]">
                <span>Add ${freeShippingThreshold - subtotal} for Free Shipping</span>
                <span className="font-semibold text-[#1F3D2B] tabular-nums">
                  ${subtotal} / ${freeShippingThreshold}
                </span>
              </div>
              <div className="w-full bg-[#E2DDD4] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1F3D2B] h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {orderComplete ? (
            /* Order Success State */
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-[#EEF6ED] text-[#1F3D2B] rounded-full mx-auto flex items-center justify-center border border-[#cbead4]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5E7A68]">
                  Sacred Batch Dispensation Initiated
                </span>
                <h3 className="font-serif text-2xl text-[#1F3D2B] mt-1">
                  Order {orderRef} Confirmed
                </h3>
              </div>

              <div className="bg-[#F9F8F5] border border-[#E2DDD4] rounded-xl p-4 text-xs text-left space-y-2">
                <div className="flex justify-between pb-1 border-b border-[#E2DDD4]">
                  <span className="text-[#5E7A68]">Client:</span>
                  <span className="font-semibold text-[#1F3D2B]">{customerName}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-[#E2DDD4]">
                  <span className="text-[#5E7A68]">Shipping To:</span>
                  <span className="text-[#1F3D2B] text-right">{shippingAddress}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-[#E2DDD4]">
                  <span className="text-[#5E7A68]">Payment Method:</span>
                  <span className="text-[#1F3D2B] font-medium uppercase">
                    {paymentMethod === 'card' ? 'Secure Card' : 'Cash on Delivery'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-[#1F3D2B]">Total Calibrated:</span>
                  <span className="font-bold text-[#1F3D2B] tabular-nums">${finalTotal}.00</span>
                </div>
              </div>

              <p className="text-xs text-[#5E7A68] leading-relaxed">
                Your formulations will be freshly compounded and packed in dark amber glass with herbal tamper seals. Expected arrival in 3–4 business days.
              </p>

              <button
                onClick={() => {
                  setOrderComplete(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="w-full bg-[#1F3D2B] text-white text-xs font-semibold py-3 rounded-lg hover:bg-[#082717]"
              >
                Return to Apothecary
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout View */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#5E7A68] hover:text-[#1F3D2B] underline mb-3 block"
                >
                  &larr; Back to Cart Items
                </button>
                <h3 className="font-serif text-xl text-[#1F3D2B]">
                  Dispensation Delivery Address
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1F3D2B] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Priya Iyer"
                  className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3 py-2 text-xs focus:ring-1.5 focus:ring-[#5E7A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1F3D2B] uppercase mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="128 Lotus Lane, Apt 4B"
                  className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3 py-2 text-xs focus:ring-1.5 focus:ring-[#5E7A68] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F3D2B] uppercase mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="94107"
                    className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3 py-2 text-xs focus:ring-1.5 focus:ring-[#5E7A68] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1F3D2B] uppercase mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3 py-2 text-xs focus:ring-1.5 focus:ring-[#5E7A68] focus:outline-none"
                  >
                    <option value="card">Prepaid Card</option>
                    <option value="cod">Cash on Delivery (COD)</option>
                  </select>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-3 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] text-xs space-y-1.5 mt-4">
                <div className="flex justify-between">
                  <span className="text-[#5E7A68]">Items Subtotal:</span>
                  <span className="font-semibold text-[#1F3D2B] tabular-nums">${subtotal}.00</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#C27D60]">
                    <span>Sacred Promo (15%):</span>
                    <span className="font-semibold tabular-nums">-${discountAmount}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#5E7A68]">Shipping:</span>
                  <span className="font-semibold text-[#1F3D2B]">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}.00`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E2DDD4] text-sm">
                  <span className="font-semibold text-[#1F3D2B]">Final Total:</span>
                  <span className="font-bold text-[#1F3D2B] tabular-nums">${finalTotal}.00</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold py-3 rounded-lg transition-colors cursor-pointer mt-4"
              >
                Place Sacred Botanical Order · ${finalTotal}.00
              </button>
            </form>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16 space-y-3">
              <p className="font-serif text-lg text-[#1F3D2B]">Your ritual kit is currently empty</p>
              <p className="text-xs text-[#5E7A68] max-w-xs mx-auto">
                Explore our classical single-origin extracts or take the Prakriti diagnostic to discover your personalized formula.
              </p>
            </div>
          ) : (
            /* Cart Items List */
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] flex gap-3.5"
                >
                  <div className="w-18 h-18 rounded-lg overflow-hidden border border-[#E2DDD4] bg-white shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#1F3D2B] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#727972] hover:text-[#ba1a1a] p-1 cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#5E7A68] italic block">
                        {item.product.botanicalName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E2DDD4] rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-[#424843] hover:text-[#1F3D2B] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#1F3D2B] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-[#424843] hover:text-[#1F3D2B] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#1F3D2B] tabular-nums">
                        ${item.product.price * item.quantity}.00
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo code box */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (Try RITUAL15)"
                    className="flex-1 bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3 py-2 text-xs uppercase focus:ring-1.5 focus:ring-[#5E7A68] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#EBE6DF] hover:bg-[#e2ddd4] text-[#1F3D2B] text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-[#ba1a1a] mt-1">{promoError}</p>
                )}
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-[#1F3D2B] font-semibold mt-1">
                    ✓ 15% Sacred Discount Activated!
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && !isCheckingOut && !orderComplete && (
          <div className="p-5 border-t border-[#E2DDD4] bg-[#F9F8F5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#424843]">
                <span>Formulations Subtotal:</span>
                <span className="font-semibold text-[#1F3D2B] tabular-nums">${subtotal}.00</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#C27D60]">
                  <span>Discount Applied (15%):</span>
                  <span className="font-semibold tabular-nums">-${discountAmount}.00</span>
                </div>
              )}
              <div className="flex justify-between text-[#424843]">
                <span>Shipping:</span>
                <span className="font-semibold text-[#1F3D2B]">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost}.00`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E2DDD4] text-sm">
                <span className="font-semibold text-[#1F3D2B]">Total Calibrated:</span>
                <span className="font-bold text-[#1F3D2B] tabular-nums">${finalTotal}.00</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Proceed to Dispensation Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
