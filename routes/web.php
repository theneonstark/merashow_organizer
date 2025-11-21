<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Main page
Route::get('/signup', fn () => Inertia::render('Auth/register'))->middleware('guest');
Route::redirect('/', '/signup')->middleware('guest');



Route::get('login', [UserController::class, 'loginpage'])->middleware('guest');
Route::get('/onboarding', [UserController::class, 'onboardingPage'])->name('onboarding.page');
Route::post('/register', [UserController::class, 'register']);

Route::group(['prefix' => 'auth'], function (){
    Route::post('onboarding', [UserController::class, 'onboarding'])->middleware('auth');
    Route::get('/logout', [UserController::class, 'logout'])->middleware('auth');
    Route::post('check', [UserController::class, 'login'])->name('authCheck');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('/dashboard', [HomeController::class, 'index']);
    Route::group(['prefix'=>'events'], function () {
        Route::get('/', fn () => Inertia::render('events'));
        Route::get('/new', [EventController::class, 'index']);
        Route::post('/create', [EventController::class, 'store']);
        Route::get('/list', [EventController::class, 'fetch']);
        Route::post('/update/{id}', [EventController::class, 'update']);
        Route::post('/toggle-status/{id}', [EventController::class, 'toggleStatus']);
        Route::delete('/delete/{id}', [EventController::class, 'destroy']);
    });

    Route::get('/analytics', fn () => Inertia::render('analytics'));
    Route::get('/payouts', fn () => Inertia::render('payouts'));
    Route::get('/profile', fn () => Inertia::render('profile'));
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
