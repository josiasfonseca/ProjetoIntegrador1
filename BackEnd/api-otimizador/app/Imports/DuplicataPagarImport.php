<?php

namespace App\Imports;

use App\Models\DuplicataPagar;
use Maatwebsite\Excel\Concerns\ToModel;

class DuplicataPagarImport implements ToModel
{

    private $idEmpresa;

    public function __construct($idEmpresa) {
        $this->idEmpresa = $idEmpresa;
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
        $cnpj = str_replace(".", "", $row[2]);
        $cnpj = str_replace("/", "", $cnpj);
        $cnpj = str_replace("-", "", $cnpj);
        $cnpj = strlen($cnpj) <> 14 ? "" : $cnpj;

        $qnt = $row[1] - 2;
        $data = date( "Y-m-d", strtotime( "1900-01-01 +$qnt day" ) );
        $novadata = str_replace("/", "-", $data);
        $emp = intval($this->idEmpresa);
        return new DuplicataPagar([
            'empresa_id' => $emp ?? $this->idEmpresa,
            "cod_fornecedor" => $row[0] ?? $row["ID TRN"],
            "nome_fornecedor" => $row[3] ?? $row["Fornecedor"],
            "data" => $data,
            "cnpj" => $cnpj ?? null,
            "valor_juros" => $row["Valor Juros"] ?? $row[5],
            "valor_desc" => $row["Valor Desc."] ?? $row[6],
            "total_pago" => $row["Valor Pago"] ?? $row[7],
            "valor_doc" => $row["Valor Doc."] ?? $row[11],
            "observacao" => $row["Observação"] ?? $row[9],
            "numero_nota_fiscal" => $row["Número Doc"] ?? $row[8],
            "banco" => $row["Conta - que pagaou"] ?? $row[10],
        ]);
    }
}
