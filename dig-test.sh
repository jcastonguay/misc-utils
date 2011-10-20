#!/bin/bash


cat $1 |while read line
do
	
	dig  @$line google.com >/dev/null 2>/dev/null
	
	if [ $? -eq 0 ]
	then echo $line
	fi
done
