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
        'cpf' => $faker->randomElement($array = array ('07945665410','07545638545','07565485918')),
        'tipo_usuario_id' => $faker->numberBetween($min = 1, $max = 2),
        // 'email' =>  strtolower($faker->word) . strtolower($faker->randomElement($array = array ('@gmail.com','@hotmail.com'))),
        'email' =>  $faker->email,
        'telefone' =>  $faker->tollFreePhoneNumber,
        'whatsapp' =>  $faker->tollFreePhoneNumber,
        'cep' =>  $faker->randomElement($array = array ('85851000','85851150','85851200')),
        'endereco' =>  $faker->streetName,
        'numero' =>  $faker->numberBetween($min = 1, $max = 10),
        'complemento' =>  'complemento',
        'bairro' =>  'Bairro ' . $faker->word,
        'uf' =>  $faker->randomElement($array = array ('PR','SP','AM')),
        'codigo_municipio' =>  $faker->randomElement($array = array ('4108304','4108308','4108340')),
        'cidade' =>  $faker->city,
    ];
});
