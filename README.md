# LCP API
Postman request collections for the LCP.

Intended for the [Postman Native App](https://www.getpostman.com).

## Quick Start
Download LCP API.postman\_collection.json and import into Postman.

Setup one environment with a url, macKeyId, macKey (from console),
and one lpid - Global Rewards, for example:
* 43f39a8f-cac9-4957-8480-a83b6093cfe3 (production)
* 3d94b74b-9ed6-4620-8f5c-9d7a37eff5a8 (staging)

Get the LP details using the request found under LCP API -> LPs -> Get LP.

## Reference
* [LCP API Reference](http://points.github.io/Loyalty-Commerce-Platform/?doc=api-reference)

### LCP URLs
* staging: https://staging.lcp.points.com/v1
* production: https://lcp.points.com/v1

## LCP API.postman\_collection.json
A series of Postman requests for interacting with the LCP API.

These requests are designed to be **mostly** immutable (i.e. they **do not change**.)
Variations or input is mostly handled using environment variables.
POST/PUT/PATCH bodies are intended to be "fill-in-the-blank" examples
and should not be saved permanently after making a request.

The requests should **not** be modified to accommodate different
environments (see Environment below.)

### Environment
An environment should be created for each macKeyId.  For each app
or account there will typically be an environment for staging and
another for production.

The following environment variables are those most commonly used
in the requests found in this project:

* url: the LCP URL for the environment being configured
* macKeyId: from your account or app, necessary for authentication
* macKey: from your account or app, necessary for authentication
* lpid: A loyalty program ID
* appid: An application ID
* accountid: An account ID (ex: matt.deluco@points.com)

Pre-request and test (post-request) scripts automatically generate
some environment variables - these should not be modified by hand:

* \_AUTH\_HEADER: the LCP authorization header
* \_accountId: a URL-encoded accountId

#### Conventions
Environment variables are named by convention.

* Variables generated programmatically begin with a leading underscore
  * \_accountId
* Variables used in the request header are uppercase
  * \_AUTH\_HEADER (programmatically generated, and an http header value)

## Requests

### Usage
After setting up an environment (staging or production) the environment
being used would be further edited to include an *lpid* (for example.)
The environment would then be ready to make requests that require an
lpid:

* Get LP
* Get LP URLs
* Set LP URLs
* etc.

### Conventions
With a few exceptions request names follow a prefix convention based
on the HTTP method used.  These names are inteded to mimic the
conventions used in the [PyLCP project](https://github.com/Points/PyLCP)
[LCPCrud class](https://github.com/Points/PyLCP/blob/master/pylcp/crud/base.py#L57).

* GET: request names start with "Get"
* POST: request names start with "Create"
* PUT: request names start with "Update"
* PATCH: request names start with "Modify"
* DELETE: request names starte with "Delete"

### Request Body
Any request that requires a body should be pre-populated with an
*example* body.  This gives the user an idea of the necessary
properties and data structure that the LCP expects for that request.

Use the example body by "filling in the blanks".  When finished
with a particular request where changes have been made to the body,
close but **do not save** the request.  This ensures that the
example body remains intact the next time the request is to be used.
