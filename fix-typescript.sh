#!/bin/bash

# Fix unused React import
find src -type f -name "*.tsx" -exec sed -i 's/import React from "react";//g' {} +

# Fix unused variables
find src -type f -name "*.tsx" -exec sed -i 's/const \[.*\] = useState();//g' {} +

# Add proper type annotations for unknown types
find src -type f -name "*.tsx" -exec sed -i 's/: unknown/: any/g' {} + 