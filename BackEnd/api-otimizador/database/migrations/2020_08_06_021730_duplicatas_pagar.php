<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DuplicatasPagar extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duplicatas_pagar', function (Blueprint $table) {
            $table->id('id_duplicata_pagar');
            $table->dateTime('data');
            $table->string('cnpj', 14)->unique();
            $table->integer('cod_fornecedor');
            $table->string('nome_fornecedor', 255);
            $table->decimal('valor_doc', 10, 2);
            $table->decimal('valor_juros', 10, 2);
            $table->decimal('valor_desc', 10, 2);
            $table->decimal('total_pago', 10, 2);
            $table->string('numero_nota_fiscal', 45);
            $table->string('banco', 45);
            $table->string('observacao', 255);
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->timestamps();
            $table->softDeletes();

            $table->index(["cod_fornecedor", "data", "cnpj"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('duplicatas_pagar');
    }
}
