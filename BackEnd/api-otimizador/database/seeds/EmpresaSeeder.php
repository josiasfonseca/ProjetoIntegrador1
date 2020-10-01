<?php

use Illuminate\Database\Seeder;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Empresa::class, 50)->create()->each(function ($empresa) {
            try {
                $empresa->save();
            } catch (\Throwable $th) {
               // return 'Erro: ' . $th;
            }
        });
    }
}
