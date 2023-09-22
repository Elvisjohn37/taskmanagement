<?php

namespace App\Http\Services;

class TaskController
{
    
    public function responseFormatter($data)
    {
        return ["data" => $data];
    }
}
