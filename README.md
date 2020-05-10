# Rydeu-greenfield-app

## All End Points:
- **API:**
  * ***/greenfield/v1/api*** : Pass request as query parameters and get the response from the api. Query parameters - {city,organization_id,total_distance}.
- **Organizations:**
  * ***/greenfield/v1/organizations*** : Create a new organization or fetch all existing organizations. Supports [GET,POST].
  * ***/greenfield/v1/organizations/{orgId}*** : Fetch an organization.
- **Vehicles:**
  * ***/greenfield/v1/vehicles*** : Create a new vehicle or fetch all existing vehicles. Supports [GET,POST].
  * ***/greenfield/v1/vehicles/{vId}*** : Fetch a vehicle.
- **Pricing:**
  * ***/greenfield/v1/pricing*** : Create or Fetch all existing pricings available. Supports [GET,POST].
  * ***/greenfield/v1/pricing/{pId}*** : Update details of a particular pricing.
- **Invalid:**
  * ***/\**** : All invalid routes are handled by error response.
