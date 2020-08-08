<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TipoUsuarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_usuarios', function (Blueprint $table) {
            $table->id('id_tipo_usuario');
            $table->string('tipo', 45);
            $table->timestamps();
            $table->softDeletes();

            $table->index(["tipo"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_usuarios');
    }
}
