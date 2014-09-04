#!/bin/sh
ember build --environment=production --output-path=build
appcfg.py --oauth2 update build/
