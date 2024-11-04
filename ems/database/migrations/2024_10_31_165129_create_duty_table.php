<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('duty', function (Blueprint $table) {
            $table->bigIncrements('duty_id');  // Add a semicolon here
            $table->string('lec_id');
            $table->date('duty_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('course_code');
            $table->string('exam_hall');
            // Add other fields as necessary
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('duty');
    }
};
