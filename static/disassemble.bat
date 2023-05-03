@Call c:\ems\emsdk activate latest
cd ./static/wasm/src/
wasm-dis wasm/hello.wasm -o hello.wast
Pause