#!/bin/bash

USER=flask
GROUP=flask

USER_ID="$(stat -c '%u' /usr/src/app)" 
GROUP_ID="$(stat -c '%g' /usr/src/app)"
echo "Starting with UID : $USER_ID GID: $GROUP_ID"

groupadd -g $GROUP_ID $GROUP
useradd --shell /bin/bash -u $USER_ID -g $GROUP -o -c "" -m $USER
export HOME=/home/$USER

# Block until the manifest file appears.
# TODO Figure out why the docker-compose.yml links and depends_on
# don't take care of this.
echo "Pausing until file exists."
while : ; do
  [[ -f "/usr/src/app/src/build/manifest.json" ]] && break
  sleep 5 
done

exec /usr/local/bin/gosu $USER_ID:$GROUP_ID "$@"
