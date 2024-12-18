<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\Student;

class StudentChart extends ChartWidget
{
    protected static ?string $heading = 'Jumlah Siswa per Kelas';

    protected static ?string $maxHeight = '900px';

    protected function getData(): array
    {
        // Mengambil jumlah siswa per kelas
        $kelasCounts = Student::select('class', \DB::raw('count(*) as total'))
            ->groupBy('class')
            ->get()
            ->pluck('total', 'class')
            ->toArray();

        // Data untuk chart: jumlah siswa per kelas
        return [
            'labels' => array_keys($kelasCounts),  
            'datasets' => [
                [
                    'label' => 'Jumlah Siswa per Kelas',
                    'data' => array_values($kelasCounts), 
                    'backgroundColor' => '#36A2EB', 
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'bar';  // Jenis chart batang
    }
}
