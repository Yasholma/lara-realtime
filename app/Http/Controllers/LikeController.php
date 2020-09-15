<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Reply;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Like a reply
     *
     * @return \Illuminate\Http\Response
     */
    public function like(Reply $reply)
    {
        $reply->likes()->create(['user_id' => auth()->id()]);
        return response(null, 204);
    }

    public function unlike(Reply $reply)
    {
        $reply->likes()->where('user_id', auth()->id())->delete();
        return response(null, 204);
    }
}
