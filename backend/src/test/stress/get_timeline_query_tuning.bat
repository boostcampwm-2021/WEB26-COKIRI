@echo off
call artillery run --output ./query_tuning/timeline/report/get_timeline1.json ./get_timeline_script/get_timeline1.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline1.html ./query_tuning/timeline/report/get_timeline1.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline2.json ./get_timeline_script/get_timeline2.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline2.html ./query_tuning/timeline/report/get_timeline2.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline4.json ./get_timeline_script/get_timeline4.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline4.html ./query_tuning/timeline/report/get_timeline4.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline8.json ./get_timeline_script/get_timeline8.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline8.html ./query_tuning/timeline/report/get_timeline8.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline16.json ./get_timeline_script/get_timeline16.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline16.html ./query_tuning/timeline/report/get_timeline16.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline32.json ./get_timeline_script/get_timeline32.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline32.html ./query_tuning/timeline/report/get_timeline32.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline64.json ./get_timeline_script/get_timeline64.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline64.html ./query_tuning/timeline/report/get_timeline64.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline128.json ./get_timeline_script/get_timeline128.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline128.html ./query_tuning/timeline/report/get_timeline128.json
timeout /t 10

call artillery run --output ./query_tuning/timeline/report/get_timeline256.json ./get_timeline_script/get_timeline256.yaml
call artillery report --output ./query_tuning/timeline/result/get_timeline256.html ./query_tuning/timeline/report/get_timeline256.json