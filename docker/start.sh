#!/bin/bash

sed -i -e "s/token = \"TOKEN_HERE\"/token = \"$BOT_TOKEN\"/g" ./config.toml
CONFIG_PATH="config.toml" node index.js
