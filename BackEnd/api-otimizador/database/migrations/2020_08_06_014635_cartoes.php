<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Cartoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cartoes', function (Blueprint $table) {
            $table->id('id_cartao');
            $table->string('descricao', 225);
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('layout_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->foreign('layout_id')->references('id_layout')->on('layouts');
            $table->timestamps();
            $table->softDeletes();

            $table->index(["empresa_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cartoes');
    }
}
