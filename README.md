# Rydeu-greenfield-app

## All End Points:
- **prefix:**
  * ***/greenfield/v1*** : Prefix for all routes.
- **Organizations:**
  * ***/organizations*** : Create a new organization or fetch all existing organizations. Supports [GET,POST].
  * ***/organizations/{orgId}*** : Fetch an organization.
- **Vehicles:**
  * ***/vehicles*** : Create a new vehicle or fetch all existing vehicles. Supports [GET,POST].
  * ***/vehicles/{vId}*** : Fetch a vehicle.
- **Pricing:**
  * ***/pricing*** : Create or Fetch all existing pricings available. Supports [GET,POST].
  * ***/pricing/{pId}*** : Update details of a particular pricing.
- **Invalid:**
  * ***/\**** : All invalid routes are handled by error response.
