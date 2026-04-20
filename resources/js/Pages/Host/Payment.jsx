import {router} from '@inertiajs/react'

export default function PaymentPage({ booking }) {

  const handlePay = () => {
    router.post(route("payments.pay", booking.id));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Төлбөр хийх</h2>

      <p>Нийт дүн: {booking.total_price}₮</p>

      <button
        onClick={handlePay}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl"
      >
        Төлбөр төлөх
      </button>
    </div>
  );
}