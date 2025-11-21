<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EventController
{
    public function index(){
        return Inertia::render('createEvent');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'artist' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'venue' => 'required|string',
            'city' => 'required|string',
            'price' => 'required|numeric',
            'totalSeats' => 'required|integer',
            'poster' => 'nullable|image|max:2048'
        ]);

        $posterPath = null;

        // Handle file upload (without symlink)
        if ($request->hasFile('poster')) {
            $file = $request->file('poster');
            $filename = time() . '_' . $file->getClientOriginalName();
            $posterPath = 'uploads/events/' . $filename;
            $file->move(public_path('uploads/events'), $filename);
        }

        $event = Event::create([
            'user_id' => auth()->id(),

            'name' => $request->name,
            'artist' => $request->artist,
            'category' => $request->category,
            'description' => $request->description,

            'date' => $request->date,
            'time' => $request->time,

            'venue' => $request->venue,
            'city' => $request->city,

            'price' => $request->price,
            'total_seats' => $request->totalSeats,

            'poster' => $posterPath
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Event created successfully',
            'event' => $event
        ]);
    }

    public function fetch()
    {
        $events = Event::where("user_id", Auth::id())->orderBy("id", "DESC")->get();

        return response()->json([
            "status" => "success",
            "events" => $events
        ]);
    }

    // 👉 UPDATE EVENT (EDIT)
    public function update(Request $request, $id)
    {
        $event = Event::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$event) {
            return response()->json(['status' => false, 'message' => "Event not found"], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'        => 'required|string',
            'artist'      => 'required|string',
            'category'    => 'required|string',
            'description' => 'required|string',
            'date'        => 'required|date',
            'time'        => 'required',
            'venue'       => 'required|string',
            'city'        => 'required|string',
            'price'       => 'required|numeric',
            'totalSeats'  => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $event->update([
            'name'        => $request->name,
            'artist'      => $request->artist,
            'category'    => $request->category,
            'description' => $request->description,
            'date'        => $request->date,
            'time'        => $request->time,
            'venue'       => $request->venue,
            'city'        => $request->city,
            'price'       => $request->price,
            'total_seats' => $request->totalSeats,
        ]);

        return response()->json(['status' => true, 'message' => 'Event updated', 'event' => $event]);
    }


    // 👉 PAUSE / RESUME
    public function toggleStatus($id)
    {
        $event = Event::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$event) {
            return response()->json(['status' => false, 'message' => "Event not found"], 404);
        }

        $event->status = $event->status === "active" ? "paused" : "active";
        $event->save();

        return response()->json([
            'status' => true,
            'message' => 'Status updated',
            'event' => $event
        ]);
    }


    // 👉 DELETE EVENT
    public function destroy($id)
    {
        $event = Event::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$event) {
            return response()->json(['status' => false, 'message' => "Event not found"], 404);
        }

        $event->delete();

        return response()->json([
            'status' => true,
            'message' => 'Event deleted'
        ]);
    }
}
