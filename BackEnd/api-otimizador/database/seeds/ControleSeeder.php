<?php

use Illuminate\Database\Seeder;

class ControleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Controle::class, 20)->create()->each(function ($controle) {
            $controle->save();
        });
    }
}
