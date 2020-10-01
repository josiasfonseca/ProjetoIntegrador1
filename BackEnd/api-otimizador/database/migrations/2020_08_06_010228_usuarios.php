<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Usuarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');
            $table->string('nome', 45);
            $table->string('login', 45)->unique();
            $table->string('senha', 80);
            $table->string('cpf', 11)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('telefone', 30)->nullable();
            $table->string('whatsapp', 30)->nullable();
            $table->string('cep', 8)->nullable();
            $table->string('endereco', 150)->nullable();
            $table->string('numero', 10)->nullable();
            $table->string('complemento', 50)->nullable();
            $table->string('bairro', 50)->nullable();
            $table->string('uf', 2)->nullable();
            $table->string('codigo_municipio', 8)->nullable();
            $table->string('cidade', 150)->nullable();
            $table->unsignedBigInteger('tipo_usuario_id');
            $table->foreign('tipo_usuario_id')->references('id_tipo_usuario')->on('tipo_usuarios');
            $table->timestamps();
            $table->softDeletes();

            $table->index(["nome", "login"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
