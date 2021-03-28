#!/bin/bash

sed -i -e "s/token = \"TOKEN_HERE\"/token = \"$BOT_TOKEN\"/g" ./config.toml
exec env CONFIG_PATH="config.toml" node index.js
