<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class MessageSent implements ShouldBroadcast
{
    public $message;
    public $sender_id;

    public function __construct($message, $sender_id)
    {
        $this->message = $message;
        $this->sender_id = $sender_id;
    }

    public function broadcastOn()
    {
        return new Channel('chat'); // ✅
    }

    public function broadcastAs()
    {
        return 'message';
    }
}