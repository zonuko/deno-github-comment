#!/bin/bash
gcc -c -fPIC -o ./ext/mysql/mysql.o ./ext/mysql/mysql.c
gcc -shared -W -o ./ext/mysql/mysql.so ./ext/mysql/mysql.o -L/usr/lib/x86_64-linux-gnu -lmysqlclient
