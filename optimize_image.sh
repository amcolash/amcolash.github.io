#!/bin/bash

COMMAND="convert -background #fdfdfd -alpha remove -strip -interlace Plane -quality 90"

if [ "$#" -lt 1 ]; then
    echo "Usage: optimize_image.sh [file|folder]"
fi

for f in "$@"; do
    # If the file/folder exists
    if [ -n $f ]; then
        if [ -d $f ]; then
            # If a directory, only process pngs
            for i in $f/*.png; do
                [ -f "$i" ] || break
                $($COMMAND $i ${i%.*}.jpg)
                rm $f
            done
        else
            # If a file
            $($COMMAND $f ${f%.*}.jpg)
            rm $f
        fi
    fi
done