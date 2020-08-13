<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Controles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('controles', function (Blueprint $table) {
            $table->id('id_controle');
            $table->string('ano', 45);
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->enum('jan', ['', 'X', 'OK']);
            $table->enum('fev', ['', 'X', 'OK']);
            $table->enum('mar', ['', 'X', 'OK']);
            $table->enum('abr', ['', 'X', 'OK']);
            $table->enum('mai', ['', 'X', 'OK']);
            $table->enum('jun', ['', 'X', 'OK']);
            $table->enum('jul', ['', 'X', 'OK']);
            $table->enum('ago', ['', 'X', 'OK']);
            $table->enum('set', ['', 'X', 'OK']);
            $table->enum('out', ['', 'X', 'OK']);
            $table->enum('nov', ['', 'X', 'OK']);
            $table->enum('dez', ['', 'X', 'OK']);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['empresa_id', 'ano']);
            $table->index(["ano", "empresa_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('controles');
    }
}
