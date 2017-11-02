# Pre-Request Scripts

## auth_header.js
This script generates the "Authorization" header necessary to make
calls to the LCP.

Requirements
* This script requires a valid macKey and macKeyId for the environment
being accessed.  The values can be either for an **account** or an **app**.
The values should be added to the Postman environment variables "macKey" and
"macKeyId" respectively.

Environment
* This script creates the environment variable "AUTH_HEADER"

Configuration
* Postman request headers should be configured with "Authorization: {{AUTH_HEADER}}"
