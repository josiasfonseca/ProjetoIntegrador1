<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Recebimentos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recebimentos', function (Blueprint $table) {
            $table->id('id_recebimento');
            $table->string('descricao', 255);
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('layout_id');
            $table->foreign('layout_id')->references('id_layout')->on('layouts');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
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
        Schema::dropIfExists('recebimentos');
    }
}
