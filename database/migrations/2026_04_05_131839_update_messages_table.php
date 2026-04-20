<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // user_id → sender_id rename
            $table->renameColumn('user_id', 'sender_id');

            // conversation_id нэмэх
            $table->unsignedBigInteger('conversation_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::table('bookings', function (Blueprint $table) {
             $table->dropColumn('messages');
        });
    }
};
