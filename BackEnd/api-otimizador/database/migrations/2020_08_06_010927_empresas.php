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
            $table->string('razao_social', 150);
            $table->string('cnpj', 14)->unique();
            $table->string('ie', 20);
            $table->string('im', 20);
            $table->enum('tipo', ['L.P.', 'L.R.', 'S.N.']);
            $table->string('email', 100)->nullable();
            $table->string('contato', 100)->nullable();
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
