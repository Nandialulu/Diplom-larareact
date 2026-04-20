<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function pay(Request $request, Booking $booking)
    {
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }

        if ($booking->payment && $booking->payment->payment_status === 'paid') {
            return back()->with('error', 'Энэ захиалга аль хэдийн төлөгдсөн байна.');
        }

        if ($booking->booking_status === 'cancelled') {
            return back()->with('error', 'Цуцлагдсан захиалгад төлбөр хийх боломжгүй.');
        }

        DB::transaction(function () use ($booking) {
            $payment = payment::updateOrCreate(
                ['booking_id' => $booking->id],
                [
                    'amount' => $booking->total_price,
                    'payment_method' => 'fake_card',
                    'payment_status' => 'paid',
                    'transaction_id' => 'TXN-' . strtoupper(Str::random(10)),
                    'paid_at' => now(),
                ]
            );

            $booking->update([
                'is_paid' => true,
                'booking_status' => 'pending',
            ]);
        });

        return back()->with('success', 'Төлбөр амжилттай төлөгдлөө.');
    }
}