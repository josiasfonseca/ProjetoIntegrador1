<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\TipoUsuario;
use Faker\Generator as Faker;

$factory->define(TipoUsuario::class, function (Faker $faker) {
    return [
        'tipo' => strtoupper($faker->randomElement($array = array ('FUNCIONARIO','GERENTE')),)
    ];
});
