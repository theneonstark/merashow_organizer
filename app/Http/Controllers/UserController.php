<?php

namespace App\Http\Controllers;

use App\Models\Onboarding;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController
{
    public function loginpage(Request $get)
    {
        return Inertia::render('Auth/login');
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => 'ERR',
                'message' => 'User not found'
            ]);
        }

        if (!Auth::validate([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            return response()->json([
                'status' => 'ERR',
                'message' => 'Invalid email or password'
            ]);
        }

        // Login the user
        Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ]);

        session(['loginid' => $user->id]);

        // 👉 ONLY ONE CONDITION
        if ($user->terms_accepted == 0) {
            return response()->json([
                'status' => 'onboarding',
                'message' => 'Please complete your onboarding',
                'redirect' => '/onboarding'
            ]);
        }

        // Else go dashboard with success message
        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'redirect' => '/dashboard'
        ]);
    }



    public function signup()
    {
        return Inertia::render('Signup');
    }

    public function register(Request $request)
    {
        // Validate only required fields
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Create user with minimal details
        $user = User::create([
            'name'      => $validated['name'],
            'email'     => $validated['email'],
            'password'  => bcrypt($validated['password']),
            'role_id'   => 2, // 🟢 2 = Organizer/Vendor (change if needed)
        ]);

        // Login the newly registered user
        auth()->login($user);

        // Redirect user to onboarding page
        return redirect()->route('onboarding.page');  // 👈 isko tum apne route name ke hisab se change kar sakte ho
    }

    public function onboardingPage()
    {
        return Inertia::render('onboarding');
    }

    public function onboarding(Request $request)
    {
        $step = $request->step;
        $user = auth()->user();

        switch ($step) {
            case 1:
                $validated = $request->validate([
                    'organizationName' => 'required|string|max:255',
                    'businessType' => 'required|string|max:255',
                    'description' => 'nullable|string',
                    'contactPerson' => 'required|string|max:255',
                    'contactPhone' => 'required|string|max:20',
                ]);

                $user->update([
                    'org_name' => $validated['organizationName'],
                    'business_id' => null,
                    'business_description' => $validated['description'],
                    'contact_person_name' => $validated['contactPerson'],
                    'contact_phone' => $validated['contactPhone'],
                ]);
                break;

            case 2:

                $validated = $request->validate([
                    'gst_certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:20480',
                    'aadhaar_front'   => 'required|file|mimes:pdf,jpg,jpeg,png|max:20480',
                    'aadhaar_back'    => 'required|file|mimes:pdf,jpg,jpeg,png|max:20480',
                    'pan_card'        => 'required|file|mimes:pdf,jpg,jpeg,png|max:20480',
                ]);

                $uploadPath = public_path('uploads/onboarding');

                if (!is_dir($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                }

                $saveData = [];

                foreach (['gst_certificate', 'aadhaar_front', 'aadhaar_back', 'pan_card'] as $fileKey) {

                    if ($request->hasFile($fileKey)) {

                        $file = $request->file($fileKey);
                        $filename = time() . '_' . $fileKey . '.' . $file->getClientOriginalExtension();

                        $file->move($uploadPath, $filename);
                        $saveData[$fileKey] = $filename;
                    }
                }

                // Create or update onboarding row
                Onboarding::updateOrCreate(
                    ['user_id' => $user->id],
                    $saveData
                );

                break;

                $validated = $request->validate([
                    'documents' => 'required|array',
                    'documents.*' => 'file|mimes:jpg,jpeg,png,pdf|max:20480', // 20 MB
                ]);

                $uploadedFiles = [];

                foreach ($request->file('documents') as $file) {

                    // Unique filename
                    $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

                    // Save file in public/uploads/documents WITHOUT symlink
                    $file->move(public_path('uploads/documents'), $filename);

                    $uploadedFiles[] = $filename;
                }

                // Save JSON in DB
                $user->update([
                    'documents' => json_encode($uploadedFiles),
                ]);

                break;

            case 3:
                $validated = $request->validate([
                    'bankAccountHolder' => 'required|string',
                    'bankAccountNumber' => 'required|string',
                    'ifscCode' => 'required|string',
                    'agreeToTerms' => 'accepted',
                ]);

                $user->update([
                    'holder_name'    => $validated['bankAccountHolder'],
                    'account_number' => $validated['bankAccountNumber'],
                    'ifsc_code'      => $validated['ifscCode'],
                    'terms_accepted' => $request->agreeToTerms ? 1 : 0,
                ]);

                break;
        }

        return response()->json(['success' => true], 200);
    }



    public function logout(Request $request)
    {
        Auth::guard()->logout();
        $request->session()->invalidate();
        return Inertia::location('/');
    }
}
