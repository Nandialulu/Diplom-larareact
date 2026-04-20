<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('bookings', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('listing_id')->constrained()->cascadeOnDelete();
    $table->date('start_date');
    $table->date('end_date');

    $table->decimal('total_price', 10, 2);

    $table->enum('booking_status', [
        'pending',
        'confirmed',
        'cancelled',
        'completed'
    ])->default('pending');

    $table->boolean('is_paid')->default(false);
    $table->timestamp('cancelled_at')->nullable();

    $table->timestamps();
    // model deeree use Illuminate\Database\Eloquent\SoftDeletes;
    // bas softDeletes ni Booking ustgah bish, log hadgalah ni chuhal
    $table->softDeletes();
    // dawhardsan function shalgah
    $table->index(['listing_id', 'start_date', 'end_date']);
});
    }
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
