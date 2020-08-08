<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Layouts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('layouts', function (Blueprint $table) {
            $table->id('id_layout');
            $table->string('comand_create', 255);
            $table->string('comand_insert', 255);
            $table->string('comand_select', 255);
            $table->string('comand_delete', 255);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('layouts');
    }
}
