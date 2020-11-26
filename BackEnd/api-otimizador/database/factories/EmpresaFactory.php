<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Models\Empresa::class, function (Faker $faker) {
    return [
        'nome' => strtoupper($faker->company),
        'razao_social' => strtoupper($faker->company),
        'usuario_id' => $faker->numberBetween($min = 1, $max = 5),
        'cnpj' => '9' . $faker->ean13,
        'ie' => $faker->ean13,
        'im' =>  substr($faker->ean13, 0, 6),
        'tipo' => $faker->randomElement($array = array ('L.P.','L.R.','S.N.')),
        'email' =>  $faker->email,
        'contato' =>  strtoupper($faker->name),
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
