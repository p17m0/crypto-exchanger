# README

# START
1. build
`docker build -t crypto_exchanger .`
2. run
`docker run -d -p 3000:80 -e RAILS_MASTER_KEY=<your_key> --name crypto_exchanger crypto_exchanger`
