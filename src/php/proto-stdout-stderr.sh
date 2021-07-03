#!/bin/bash

echo 'this is on stdout';
echo 'this is also on stdout';

echo 'this is on stderr' >&2;
echo 'this is also on stderr' >&2;