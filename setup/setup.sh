#!/usr/bin/env bash

docker-compose -f docker-compose.yml up -d
node ./setup/setup.js