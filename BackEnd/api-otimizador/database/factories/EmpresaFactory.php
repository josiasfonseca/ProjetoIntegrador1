<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Models\Empresa::class, function (Faker $faker) {
    return [
        'nome' => strtoupper($faker->company),
        'usuario_id' => $faker->numberBetween($min = 1, $max = 10),
        'cnpj' => '9' . $faker->ean13
    ];
});
