#!/bin/bash

if [ "$#" -lt 1 ]; then
    echo "Usage: optimize_jpg.sh [folder]"
    exit 1
fi

for f in `find $1 -name "*.jpg"`
do
    convert $f -resize 1000x1000 $f
done