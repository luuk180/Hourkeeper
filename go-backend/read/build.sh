#!/bin/sh
rm main.zip
GOOS=linux GOARCH=amd64 go build -o main .
zip main main root.crt
rm main