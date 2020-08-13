<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'login' => strtolower($faker->unique()->firstName),
        'nome' => $faker->name,
        'senha' => bcrypt($faker->firstName()),
        'tipo_usuario_id' => $faker->numberBetween($min = 1, $max = 5)
    ];
});
