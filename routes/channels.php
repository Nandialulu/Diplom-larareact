<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Conversation;

Broadcast::channel('chat.{id}', function ($user, $id) {
    return Conversation::find($id)?->users()->where('user_id', $user->id)->exists();
});