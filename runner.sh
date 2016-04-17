#! /bin/bash

trap "exit" SIGQUIT
logfile=hmm.log
max_filesize=10000

(
	RUST_LOG=hmm=trace ./target/debug/hmm |& tee "$logfile"
	kill -SIGQUIT $$
) &

while :; do
	sleep 1
	size=$(du "$logfile" | cut -f 1)
	echo $size
	if [ "$size" -gt "$max_filesize" ]; then
		cp hmm.log hmm.old.log
		truncate -s 0 hmm.log
	fi
done
