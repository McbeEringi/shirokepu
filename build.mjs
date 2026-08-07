#!/usr/bin/env -S bun --install=force
await Bun.$`rm -rf dst`
await Bun.$`cp -R src dst`
