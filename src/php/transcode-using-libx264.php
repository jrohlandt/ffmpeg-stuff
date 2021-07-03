<?php

require_once('./vendor/autoload.php');
require_once('./_env.php');

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


$ts = time();
$cmd = [
    'ffmpeg', 
    '-i', 
    "{$vPath}/scanners.mkv", 
    '-c:v', 
    'libx264',
    '-c:a',
    'copy', 
    // '-framerate',
    // '25',
    "{$outDir}/temp_{$ts}.mp4"
];
// $cmd = "ffmpeg -i {$vPath}/ukelele.mp4 -c:v libx264 {$outDir}/ukelele-{$rand}.mp4";


$process = new Process($cmd);
$process->setTimeout(3600);
$process->start();

// TODO use ffprobe to get totalFrames (or get duration and calc totalFrames durationInSeconds * framerate)
$totalFrames = 6875;

foreach($process as $type => $data) {
    if ($type === $process::OUT) {
        echo "\n STDOUT: {$data}\n";
    } else {
        if (strpos($data, "frame=") !== false) {
            $offset = 6;
            $len = strpos($data, "fps=") - $offset;
            $framesProcessed = trim(substr($data, $offset, $len));
            $remaining = $totalFrames - (int) $framesProcessed;
            $diff = $totalFrames - $remaining;
            $p = ceil(($diff / $totalFrames) * 100);
            echo "\nProgress: {$p}%\n";

        } else {
            echo "\n STDERR: {$data}\n";
        }
    }
}
// if (!$process->isSuccessful()) {
//     throw new ProcessFailedException($process);
// }

// echo $process->getOutput();
// echo $process->getErrorOutput();