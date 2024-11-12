<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserVote extends Pivot
{
    protected $table = 'user_vote';

    protected $fillable = ['id_user', 'id_paslon'];
    public $timestamps = false;

}