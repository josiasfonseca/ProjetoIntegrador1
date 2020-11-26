<?php

namespace App\Imports;

use App\Models\DuplicataPagar;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\Layouts\LayoutPagamento;

class DuplicataPagarImport implements ToModel
{

    private $idEmpresa;
    private $idLayoutPagamento;

    public function __construct($idEmpresa, $idLayoutPagamento) {
        $this->idEmpresa = $idEmpresa;
        $this->idLayoutPagamento = $idLayoutPagamento;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        if($row[0] == "ID TRN") {
            return null;
        }
        $layoutPagamento = LayoutPagamento::with(['layout'])->where('id_pagamento', $this->idLayoutPagamento)->first();
        $campos = $layoutPagamento->layout->campos;
        $a = explode(';', $campos);
        $array = [];
        foreach ($a as $k => $v) {
            $b = explode('=', $v);
            $array[] = $b;
        }
        foreach($array as $k) {
            if($k[0] == 'cnpj') {
                $cnpj = str_replace(".", "", $row[$k[1]]);
                $cnpj = str_replace("/", "", $cnpj);
                $cnpj = str_replace("-", "", $cnpj);
                $cnpj = strlen($cnpj) <> 14 ? "" : $cnpj;
            } else if($k[0] == 'data') {
                $qnt = $row[$k[1]] - 2;
                $data = date( "Y-m-d", strtotime( "1900-01-01 +$qnt day" ) );
                $novadata = str_replace("/", "-", $data);
            } else if ($k[0] == 'empresa_id') {
                $emp = intval($this->idEmpresa);
            } else if ($k[0] == 'cod_fornecedor') {
                $cod_fornecedor = $row[$k[1]];
            } else if ($k[0] == 'nome_fornecedor') {
                $nome_fornecedor = $row[$k[1]];
            } else if($k[0] == 'valor_juros') {
                $valor_juros = $row[$k[1]];
            } else if($k[0] == 'valor_desc') {
                $valor_desc = $row[$k[1]];
            } else if($k[0] == 'total_pago') {
                $total_pago = $row[$k[1]];
            } else if($k[0] == 'valor_doc') {
                $valor_doc = $row[$k[1]];
            } else if($k[0] == 'observacao') {
                $observacao = $row[$k[1]];
            } else if($k[0] == 'numero_nota_fiscal') {
                $numero_nota_fiscal = $row[$k[1]];
            } else if($k[0] == 'banco') {
                $banco = $row[$k[1]];
            }
        }

        return new DuplicataPagar([
            'empresa_id' => $emp ?? $this->idEmpresa,
            "cod_fornecedor" => $cod_fornecedor ?? $row["ID TRN"],
            "nome_fornecedor" => $nome_fornecedor ?? $row["Fornecedor"],
            "data" => $data,
            "cnpj" => $cnpj ?? null,
            "valor_juros" => $valor_juros ?? $row["Valor Juros"],
            "valor_desc" =>  $valor_desc ?? $row["Valor Desc."],
            "total_pago" => $total_pago ?? $row["Valor Pago"],
            "valor_doc" => $valor_doc ?? $row["Valor Doc."],
            "observacao" => $observacao ?? $row["Observação"],
            "numero_nota_fiscal" => $numero_nota_fiscal ?? $row["Número Doc"],
            "banco" => $banco ?? $row["Conta - que pagaou"],
        ]);
    }
}
