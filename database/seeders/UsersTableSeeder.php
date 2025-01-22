<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $user = User::firstOrCreate(['id' => 1], [
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
        ]);
    }
}
