<?php

function html($in)
{
    return htmlspecialchars($in, ENT_QUOTES, 'UTF-8');
}
