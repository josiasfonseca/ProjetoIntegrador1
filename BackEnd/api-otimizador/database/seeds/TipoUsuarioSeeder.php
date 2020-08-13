<?php

use Illuminate\Database\Seeder;

class TipoUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\TipoUsuario::class, 5)->create()->each(function ($tipoUsuario) {
            $tipoUsuario->save();
        });
    }
}
