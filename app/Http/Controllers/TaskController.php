<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Task;
use App\Models\Trash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;

class TaskController extends BaseController
{
    
    public function getTaskList()
    {
        $user = Auth::user();
        $result = Task::Select(
            'tasks.name',
            'tasks.description',
            'tasks.status_id',
            'tasks.status_id',
            'tasks.id'
        )
        ->where('tasks.user_id', $user->id)
        ->whereNotIn('tasks.id', function($query) {
            $query->select('task_id')
                    ->from('trashes');
        })
        ->orderBy('tasks.updated_at', 'DESC')
        ->get();
        return $result->toArray();
    }

    public function getTrashList()
    {
        $user = Auth::user();
        $result = Task::Select(
            'tasks.name',
            'tasks.description',
            'tasks.status_id',
            'tasks.status_id',
            'tasks.id'
        )
        ->where('tasks.user_id', $user->id)
        ->join('trashes', 'trashes.task_id', 'tasks.id')
        ->orderBy('trashes.updated_at', 'DESC')
        ->get();
        return response($result->toArray(), 200);
    }

    public function addTask(Request $request)
    {
        $task = new Task;
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required',
            'status_id' => 'required',
        ]);

        if($validated) {
            $task->name = $request->name;
            $task->description = $request->description;
            $task->status_id = $request->status_id;
            $task->user_id = $user->id;
            $task->save();
            
            return response($task, 200);
            
        }
    }

    public function updateTask(Request $request)
    {
        $user = Auth::user();

        
        $task = Task::find($request->input('id'));

        $task->name = $request->input('name');
        $task->description = $request->input('description');
        $task->status_id = $request->input('status_id');
        $task->user_id = $user->id;
        return response($task->update());
    }

    public function moveToTrash(Request $request)
    {
        $trash = new Trash;

        $validated = $request->validate([
            'task_id' => 'required|unique:trashes',
        ]);

        if($validated) {
            $trash->task_id = $request->task_id;
            return response($trash->save());
            
        }
        return response(0);
    }
}
