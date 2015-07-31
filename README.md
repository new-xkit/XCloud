# XCloud
XCloud for the new xkit extension.

### Meta data
The server also has 2 calls for checking if the server is running and a call for checking version numbers.
Currently these are hard coded but we could redirect to a file stored on github for convenience.

### Storing passwords
XCloud extension is currently passing md5 passwords to the server.  
Once received a bcrypt hash is computed and stored.

## Version 1
Mimick of the old XCloud server.

### Create user
XKit creates a user on the browser and then sends a username and password (md5 hashed) to the server.

### Login user
XKit sends a username and password to the server, server returns with a success or failure.
Upon success XKit caches the username and password.

### Save Preferences
1) XKit appends all of the extenion information to one json document
2) Xkit encodes it uses base64.  After encoding ___ is prepended and ___ is appended 
3) XKit uploads the encoded preferences with a username and password to the server..
4) The server authenticates the call and then stores the base64 encoded string.

### Restore Preferences
1) XKit sends a username and password to the sever.
2) The server authenticates and servers the encoded preferences back
3) XKit restores the settings based on the encoded preferences.

##Version 2
Enhancement to XCloud.


