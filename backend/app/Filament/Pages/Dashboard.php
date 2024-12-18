<?php
 
namespace App\Filament\Pages;

use App\Filament\Widgets\PresenceChart;
use App\Filament\Widgets\StudentChart;
use App\Filament\Widgets\StudentOverview;

class Dashboard extends \Filament\Pages\Dashboard
{
    protected static ?string $title = 'Dashboard';
    
    public function getWidgets(): array
    {
        return [
            StudentOverview::class,
            StudentChart::class,
            PresenceChart::class
        ];
    }
}