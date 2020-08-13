<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Models\Controle::class, function (Faker $faker) {
    return [
        "ano" => $faker->year($max = 'now'),
        "empresa_id" => $faker->numberBetween($min = 1, $max = 20),
        "jan" => $faker->randomElement($array = array ('','OK','X')),
        "fev" => $faker->randomElement($array = array ('','OK','X')),
        "mar" => $faker->randomElement($array = array ('','OK','X')),
        "abr" => $faker->randomElement($array = array ('','OK','X')),
        "mai" => $faker->randomElement($array = array ('','OK','X')),
        "jun" => $faker->randomElement($array = array ('','OK','X')),
        "jul" => $faker->randomElement($array = array ('','OK','X')),
        "ago" => $faker->randomElement($array = array ('','OK','X')),
        "set" => $faker->randomElement($array = array ('','OK','X')),
        "out" => $faker->randomElement($array = array ('','OK','X')),
        "nov" => $faker->randomElement($array = array ('','OK','X')),
        "dez" => $faker->randomElement($array = array ('','OK','X')),
    ];
});
