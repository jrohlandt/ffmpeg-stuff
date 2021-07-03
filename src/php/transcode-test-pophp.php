<?php
require_once('./_env.php');

$ts = time();
$cmd = [
    'ffmpeg', 
    '-i', 
    "{$vPath}/scanners.mkv", 
    '-c:v', 
    // 'libx264', 
    'copy',
    // '-framerate',
    // '25',
    "{$outDir}/temp_{$ts}.mp4"
];
// $cmd = "ffmpeg -i {$vPath}/ukelele.mp4 -c:v libx264 {$outDir}/ukelele-{$rand}.mp4";

$descriptor_spec = [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
];

$proc = proc_open($cmd, $descriptor_spec, $pipes, dirname(__FILE__), null);
stream_set_blocking($pipes[1], false);
stream_set_blocking($pipes[2], false);

$running = proc_get_status($proc)['running'];

while($running) {
    $status = proc_get_status($proc);
    $running = $status['running'];
    $stdout = stream_get_contents($pipes[1]);
    $stderr = fgets($pipes[2]);
    if (empty($stdout) && empty($stderr)) continue;
    echo 'Running... ' . $running . PHP_EOL;
    
    if (!empty($stdout)) {
        echo PHP_EOL . "STDOUT: {$stdout}" . PHP_EOL; 
    }

    if (!empty($stderr)) {
        echo PHP_EOL . "STDERR: {$stderr}" . PHP_EOL; 
    }
}

// var_dump($status);

$stdout = stream_get_contents($pipes[1]);
fclose($pipes[1]);
var_dump($stdout);

$stderr = stream_get_contents($pipes[2]);
fclose($pipes[2]);
var_dump($stderr);

// $status = proc_get_status($proc);
// var_dump($status);

$exitCode = proc_close($proc);
var_dump($exitCode);

