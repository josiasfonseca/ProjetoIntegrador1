<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('usuarios', 'UsuarioController@listar')->name('usuarios.listar');
Route::post('usuarios', 'UsuarioController@incluir')->name('usuarios.incluir');
Route::put('usuarios/{id}', 'UsuarioController@atualizar')->name('usuarios.atualizar');
Route::delete('usuarios/{id}', 'UsuarioController@excluir')->name('usuarios.excluir');
Route::get('usuarios/{id}', 'UsuarioController@listarPorId')->name('usuarios.listarPorId');

//Empresas
Route::get('empresas', 'EmpresaController@listar')->name('empresas.listar');

Route::get('controles', 'ControleController@listar')->name('controles.listar');
Route::get('controles/{id}', 'ControleController@listarPorId')->name('controles.listarPorId');
