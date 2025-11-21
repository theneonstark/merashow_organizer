<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;

class BookingController
{
    public function bookTicket(Request $request)
{
    $request->validate([
        'event_id' => 'required|exists:events,id',
        'quantity' => 'required|integer|min=1'
    ]);

    $event = Event::find($request->event_id);

    // tickets sold
    $sold = $event->ticketsSold();

    if (($sold + $request->quantity) > $event->total_seats) {
        return response()->json([
            'status' => 'error',
            'message' => 'Not enough seats available!'
        ], 400);
    }

    $amount = $event->price * $request->quantity;

    $booking = Booking::create([
        'event_id' => $event->id,
        'user_id' => auth()->id(),
        'quantity' => $request->quantity,
        'amount' => $amount,
        'payment_status' => 'paid'
    ]);

    return response()->json([
        'status' => 'success',
        'message' => 'Ticket booked successfully!',
        'booking' => $booking
    ]);
}

}
