<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Empresas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id('id_empresa');
            $table->string('nome', 45);
            $table->string('cnpj', 20)->unique();
            $table->unsignedBigInteger('usuario_id');
            $table->foreign('usuario_id')->references('id_usuario')->on('usuarios');
            $table->timestamps();
            $table->softDeletes();

            $table->index(["nome", "cnpj"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empresas');
    }
}
