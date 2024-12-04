import React, { useState } from 'react';
import {getUser} from '../futils/dbapi'

export default function HomeComp(){

return(

    <h1> Hello {getUser} </h1>
)
};


