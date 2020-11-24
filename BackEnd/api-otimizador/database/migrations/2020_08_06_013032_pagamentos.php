<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pagamentos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagamentos', function (Blueprint $table) {
            $table->id('id_pagamento');
            $table->string('descricao', 255);
            $table->unsignedBigInteger('layout_id');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('layout_id')->references('id_layout')->on('layouts');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
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
        Schema::dropIfExists('pagamentos');
    }
}
