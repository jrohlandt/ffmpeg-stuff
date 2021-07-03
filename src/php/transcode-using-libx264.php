<?php

require_once('./vendor/autoload.php');

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

$descriptor_spec = [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
];

// var_dump(dirname(__FILE__));
$projectRoot = '/home/jeandre/code/j/ffmpeg-stuff';
$assetsPath = $projectRoot . '/assets';
$vPath = $assetsPath . '/videos';
$aPath = $assetsPath . '/audio';
$outDir = $projectRoot . '/out';

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