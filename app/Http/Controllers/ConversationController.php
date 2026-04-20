<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
class ConversationController extends Controller
{
    public function start($hostId)
    {
        $conversation = Conversation::firstOrCreate([
            'user_id' => auth()->id(),
            'host_id' => $hostId,
        ]);

        return response()->json($conversation);
    }
}
