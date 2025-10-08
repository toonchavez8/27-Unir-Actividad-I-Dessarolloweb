#!/bin/bash

# Define the base path
BASE_DIR="./hooks"

# Define folders and files
declare -A STRUCTURE=(
  [""]="useCampaigns.ts"
  ["/campaign"]="useCampaignStore.ts useCampaignActions.ts"
  ["/session"]="useSessionStore.ts useSessionActions.ts"
  ["/npc"]="useNPCStore.ts useNPCActions.ts"
  ["/location"]="useLocationStore.ts useLocationActions.ts"
  ["/shop"]="useShopStore.ts useShopActions.ts"
  ["/item"]="useItemStore.ts useItemActions.ts"
  ["/canvas"]="useCanvasStore.ts useCanvasActions.ts"
)

# Create directories and files
for DIR in "${!STRUCTURE[@]}"; do
  FULL_DIR="$BASE_DIR$DIR"
  
  # Create directory if it doesn't exist
  if [ ! -d "$FULL_DIR" ]; then
    mkdir -p "$FULL_DIR"
    echo "Created directory: $FULL_DIR"
  fi

  # Create each file if it doesn't exist
  for FILE in ${STRUCTURE[$DIR]}; do
    FULL_FILE="$FULL_DIR/$FILE"
    if [ ! -f "$FULL_FILE" ]; then
      touch "$FULL_FILE"
      echo "Created file: $FULL_FILE"
    fi
  done
done
