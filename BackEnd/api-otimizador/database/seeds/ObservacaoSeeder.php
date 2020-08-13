<?php

use Illuminate\Database\Seeder;

class ObservacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Observacao::class, 50)->create()->each(function ($observacao) {
            $observacao->save();
        });
    }
}
