<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $totalUsers = User::count();
        $activeUsers = User::count();
        $recentUsers = User::latest()->take(5)->get();

        return Inertia::render('dashboard', [
            'totalUsers' => $totalUsers,
            'activeUsers' => $activeUsers,
            'recentUsers' => $recentUsers,
        ]);
    }
}
