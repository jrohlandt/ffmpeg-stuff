<?php

require_once('./vendor/autoload.php');
require_once('./_env.php');

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


$ts = time();
$cmd = [
    'ffmpeg', 
    '-i', 
    "{$vPath}/ukelele.mp4", 
    '-c:v', 
    'libx264', 
    // '-framerate',
    // '25',
    "{$outDir}/temp_{$ts}.mp4"
];
// $cmd = "ffmpeg -i {$vPath}/ukelele.mp4 -c:v libx264 {$outDir}/ukelele-{$rand}.mp4";


$process = new Process($cmd);
$process->start();

foreach($process as $type => $data) {
    if ($type === $process::OUT) {
        echo "\n STDOUT: {$data}\n";
    } else {
        echo "\n STDERR: {$data}\n";
    }
}
// if (!$process->isSuccessful()) {
//     throw new ProcessFailedException($process);
// }

// echo $process->getOutput();
// echo $process->getErrorOutput();