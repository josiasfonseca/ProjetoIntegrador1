<?php

namespace App\Imports;

use App\Models\DuplicataReceber;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\Layouts\LayoutRecebimento;

class DuplicataReceberImport implements ToModel
{
    private $idEmpresa;
    private $idLayoutRecebimento;

    public function __construct($idEmpresa, $idLayoutRecebimento) {
        $this->idEmpresa = $idEmpresa;
        $this->idLayoutRecebimento = $idLayoutRecebimento;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        if($row[0] == "ID TRN" || $row[0] == null) {
            return null;
        }
        $layoutRecebimento = LayoutRecebimento::with(['layout'])->where('id_recebimento', $this->idLayoutRecebimento)->first();
        $campos = $layoutRecebimento->layout->campos;
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
            } else if ($k[0] == 'cod_cliente') {
                $cod_cliente = $row[$k[1]];
            } else if ($k[0] == 'nome_cliente') {
                $nome_cliente = $row[$k[1]];
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

        return new DuplicataReceber([
            'empresa_id' => $emp ?? $this->idEmpresa,
            "cod_cliente" => $cod_cliente ?? $row[0],
            "nome_cliente" => $nome_cliente ?? $row[3],
            "data" => $data,
            "cnpj" => $cnpj ?? null,
            "valor_juros" => $valor_juros ?? $row["Valor Juros"],
            "valor_desc" => $valor_desc ?? $row["Valor Desc."],
            "total_pago" => $total_pago ?? $row["Valor Pago"],
            "valor_doc" => $valor_doc ?? $row["Valor Doc."],
            "observacao" => $observacao ?? $row["Observação"],
            "numero_nota_fiscal" => $numero_nota_fiscal ?? $row["Número Doc"],
            "banco" => $banco ?? $row["Conta - que pagaou"],
        ]);
    }
}
