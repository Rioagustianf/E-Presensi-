<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PermissionResource\Pages;
use App\Filament\Resources\PermissionResource\RelationManagers;
use App\Models\Permission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\LinkColumn;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use pxlrbt\FilamentExcel\Actions\Tables\ExportBulkAction;
use pxlrbt\FilamentExcel\Actions\Tables\ExportAction;
use pxlrbt\FilamentExcel\Exports\ExcelExport;
use pxlrbt\FilamentExcel\Columns\Column;


class PermissionResource extends Resource
{
    protected static ?string $model = Permission::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $modelLabel = 'Kelola Ijin';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('student_id')
                    ->relationship('student', 'name')
                ->required(),
                Forms\Components\Textarea::make('reason')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('document')
                    ->required(),
                Forms\Components\TextInput::make('status')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('student.name')
                    ->label('Student Name') // Menambahkan label
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->color(fn (string $state): string => match ($state) {
                        'Sakit' => 'success',
                        'Izin' => 'warning',
                        'Keperluan Keluarga' => 'warning',
                        'lainya' => 'danger',
                    })
                    ->label('Status Permintaan')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('reason')
                    ->label('Alasan')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('document')
                    ->label('Dokumen')
                    ->extraAttributes(['class' => 'text-left'])
                    ->formatStateUsing(function ($state) {
                        if ($state) {
                            // Ambil ekstensi file
                            $fileExtension = pathinfo($state, PATHINFO_EXTENSION);
                            $fileUrl = Storage::url('permissions/' . $state);
    
                            // Jika file adalah gambar
                            if (in_array(strtolower($fileExtension), ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'])) {
                                // Tampilkan link untuk membuka gambar di tab baru
                                return '<a href="' . $fileUrl . '" target="_blank">Lihat Dokumen</a>';
                            }
                            // Jika file adalah PDF
                            elseif (strtolower($fileExtension) === 'pdf') {
                                // Tampilkan link untuk membuka PDF di tab baru
                                return '<a href="' . $fileUrl . '" target="_blank">Lihat dokumen</a>';
                            }
                            // Untuk file lainnya
                            else {
                                return '<a href="' . $fileUrl . '" target="_blank">Lihat Dokumen</a>';
                            }
                        }
                        return 'Tidak ada dokumen';
                    })
                    ->html(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->headerActions([
                ExportAction::make('export')  // Menambahkan nama custom untuk tombol
                ->label('Ekspor Data') // Mengubah nama tombol
                ->exports([
                    ExcelExport::make('table')->fromTable()
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPermissions::route('/'),
            'create' => Pages\CreatePermission::route('/create'),
            'edit' => Pages\EditPermission::route('/{record}/edit'),
        ];
    }
}
