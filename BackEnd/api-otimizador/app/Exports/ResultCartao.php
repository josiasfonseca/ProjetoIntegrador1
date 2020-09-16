<?php

namespace App\Exports;


use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class ResultCartao
extends \PhpOffice\PhpSpreadsheet\Cell\StringValueBinder
implements FromArray,WithColumnWidths,WithCustomValueBinder,WithProperties,WithHeadings,WithStyles,WithCustomCsvSettings
{
    protected $lista;

    public function __construct(array $lista)
    {
        $this->lista = $lista;
    }

    public function array(): array
    {
        return $this->lista;
    }

    public function columnWidths(): array
    {
        return [
            'A' => 60,
            'B' => 40,
            'C' => 40,
            'D' => 40,
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'Otimizador',
            'lastModifiedBy' => 'JOSIAS FONSECA',
            'title'          => 'Otimizador - Projeto Integrador IFPR 2020',
            'description'    => 'Projeto Integrador 1 - JOSIAS FONSECA, MATHEUS H. GONZALEZ, KELVIN BORBA',
            'keywords'       => 'otimizador,importador,controle,controle contabil,observacao',
            'manager'        => 'JOSIAS FONSECA',
            'company'        => 'Projeto Integrador 1 IFPR 2020',
        ];
    }

    public function headings(): array
    {
        return [
            'data_venda',
            'valor_bruto',
            'valor_liq',
            'taxa',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            // 1    => ['font' => ['bold' => true]],
        ];
    }

    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';'
        ];
    }
}
