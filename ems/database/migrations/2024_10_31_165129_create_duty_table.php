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
            $table->id();
            $table->string('lec_id');
            // $table->bigIncrements('duty_id');  // Add a semicolon here
            $table->string('course_code');
            $table->date('duty_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('exam_hall');
            // Add other fields as necessary
            $table->timestamps();

            $table->foreign('lec_id')
            ->references('lec_id')
            ->on('lecturers')
            ->onDelete('cascade');
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
