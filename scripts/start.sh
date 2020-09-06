#!/bin/bash
docker stop weather

docker build --no-cache -t weather -f Dockerfile .

docker run --rm \
        -p 4200:4200 \
        -p 8080:8080 \
        -p 3306:3306 \
        --name weather \
        -v $(pwd)/app/:/var/www/html/app/ \
        -v $(pwd)/go/:/var/www/html/go/ \
        -d weather

docker exec -it weather bash