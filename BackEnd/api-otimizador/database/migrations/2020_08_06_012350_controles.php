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
            $table->string('ano', 45)->unique();
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->string('jan', 45);
            $table->string('fev', 45);
            $table->string('mar', 45);
            $table->string('abr', 45);
            $table->string('mai', 45);
            $table->string('jun', 45);
            $table->string('jul', 45);
            $table->string('ago', 45);
            $table->string('set', 45);
            $table->string('out', 45);
            $table->string('nov', 45);
            $table->string('dez', 45);
            $table->timestamps();
            $table->softDeletes();

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
