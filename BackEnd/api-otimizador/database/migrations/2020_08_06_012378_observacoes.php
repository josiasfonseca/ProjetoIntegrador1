<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Observacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('observacoes', function (Blueprint $table) {
            $table->string('observacao', 255);
            $table->string('mes_referencia', 45);
            $table->unsignedBigInteger('controle_id');
            $table->foreign('controle_id')->references('id_controle')->on('controles');
            $table->timestamps();
            $table->softDeletes();

            $table->primary(['controle_id', 'mes_referencia']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('observacoes');
    }
}
