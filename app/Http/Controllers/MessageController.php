<?php

namespace App\Http\Controllers;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
class MessageController extends Controller
{
public function store(Request $request)
{
    $message = $request->input('message');
    $sender_id = $request->input('sender_id');

    broadcast(new MessageSent($message, $sender_id))->toOthers();

    return response()->json([
        'status' => 'sent'
    ]);
}
}



