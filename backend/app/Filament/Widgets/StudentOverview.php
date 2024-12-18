<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Student;

class StudentOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            //
            Stat::make('Jumlah Siswa', Student::count())
            ->description('Jumlah siswa aktif')
            ->color('success'),
            Stat::make('Kelas Tersedia', Student::distinct('class')->count('class'))
            ->description('Jumlah kelas aktif')
            ->color('info'),
            Stat::make('Siswa per Kelas', $this->getAverageStudentsPerClass())
                ->description('Rata-rata siswa per kelas')
                ->color('warning'),
        ];
    }

    private function getAverageStudentsPerClass(): int
    {
        $totalStudents = Student::count();
        $totalClasses = Student::distinct('class')->count('class');

        return $totalClasses > 0 ? intval($totalStudents / $totalClasses) : 0;
    }
}
