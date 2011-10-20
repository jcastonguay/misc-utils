#!/bin/bash


cat $1 |while read line
do
	SERVER=`echo $line |cut -d ',' -f 1 |awk '{print $1}'|grep -v '^#'`
	if [ -n "$SERVER" ]
	then
		nslookup $SERVER
	fi
done
