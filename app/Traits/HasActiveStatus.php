<?php

namespace App\Traits;

trait HasActiveStatus
{
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }
}
