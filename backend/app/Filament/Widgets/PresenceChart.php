<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\Presence;
use Carbon\Carbon;

class PresenceChart extends ChartWidget
{
    protected static ?string $heading = 'Statistik Kehadiran Per Bulan';

    protected function getData(): array
    {
        // Inisialisasi array untuk 12 bulan
        $monthlyData = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthName = Carbon::create(null, $i, 1)->locale('id')->isoFormat('MMMM');
            $monthlyData[$monthName] = 0;
        }

        $presences = Presence::whereYear('check_in', Carbon::now()->year)->get();

        // Hitung jumlah kehadiran per bulan
        foreach ($presences as $presence) {
            $monthName = Carbon::parse($presence->check_in)->locale('id')->isoFormat('MMMM');
            if (isset($monthlyData[$monthName])) {
                $monthlyData[$monthName]++;
            }
        }

        return [
            'labels' => array_keys($monthlyData),
            'datasets' => [
                [
                    'label' => 'Jumlah Hadir',
                    'data' => array_values($monthlyData),
                    'borderColor' => '#2196F3',
                    'backgroundColor' => 'rgba(33, 150, 243, 0.2)',
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'bar'; // Tipe chart batang
    }
}
