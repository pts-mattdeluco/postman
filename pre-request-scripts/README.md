# Pre-Request Scripts

## auth_header.js
This script generates the "Authorization" header necessary to make
calls to the LCP.

auth_header.js also includes a function "substituteEnvVars()" which
can be used to perform *environment variable substitution* within a
pre-request script.  Note that it can perform recursive substitution
but has the potential to fall into an infinite loop.  This code is
based off the same code Postman itself uses to perform substitution.

Requirements
* This script requires a valid macKey and macKeyId for the environment
being accessed.  The values can be either for an **account** or an **app**.
The values should be added to the Postman environment variables "macKey" and
"macKeyId" respectively.

Environment
* This script creates the environment variable "AUTH_HEADER"

Configuration
* Postman request headers should be configured with "Authorization: {{AUTH_HEADER}}"
