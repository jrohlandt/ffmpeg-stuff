<?php

$descriptorspec = [
    0 => ['pipe', 'r'], // stdin
    1 => ['pipe', 'w'], // stdout
    2 => ['pipe', 'w'], // stderr
];

$process = proc_open('./proto-stdout-stderr.sh', $descriptorspec, $pipes, dirname(__FILE__), null);

$stdout = stream_get_contents($pipes[1]);
fclose($pipes[1]);
var_dump($stdout);

$stderr = stream_get_contents($pipes[2]);
fclose($pipes[2]);
var_dump($stderr);

$exitCode = proc_close($process);
var_dump($exitCode);
