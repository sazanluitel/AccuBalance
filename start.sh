#!/bin/sh

# Start Django server
python ./app/manage.py runserver 127.0.0.1:8000 &

# Start React server
python -m http.server --directory frontend/build --bind 127.0.0.1 3000
