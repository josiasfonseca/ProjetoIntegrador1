<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Models\Observacao::class, function (Faker $faker) {
    return [
        'mes_referencia' => strtolower($faker->randomElement($array = array ('JAN','FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'))),
        'observacao' => $faker->text($maxNbChars = 254),
        'controle_id' => $faker->numberBetween($min = 1, $max = 15),
        'estado' => $faker->randomElement($array = array ('Pendente','Concluído')),
        'updated_at' => null
    ];
});
