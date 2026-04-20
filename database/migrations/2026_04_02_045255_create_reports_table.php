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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();

            // гомдол гаргасан user
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // гомдол хүлээж авсан user (guest эсвэл host)
            $table->foreignId('reported_user_id')->constrained('users')->cascadeOnDelete();

            $table->text('reason'); // шалтгаан

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
