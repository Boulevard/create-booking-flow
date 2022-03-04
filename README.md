# create-booking-flow

## Setup and run dev

1. Configure your environment. The following tools must be installed before you start.

```
- NodeJS
- Yarn package manager (can be installed via npm by running "npm install -g yarn")
```

2. Install all required packages for the project by running the following command.

```
yarn
```

3. To connect to a Boulevard dashboard, manually set the following values in the .env file. Reach out to dev-support@blvd.co to retrieve these values. Note: must be a current Boulevard customer.

```
NEXT_PUBLIC_BLVD_BUSINESS_ID=VALID_ID_HERE
NEXT_PUBLIC_BLVD_API_KEY=VALID_KEY_HERE
NEXT_PUBLIC_MAPBOX_TOKEN=VALID_KEY_HERE
GOOGLE_MAPS_API_KEY_DEVELOPMENT=VALID_KEY_HERE
```

4. You can customize a few primary aspects of your booking flow very easily using the App UI settings in the .env file.

4.1. NEXT_PUBLIC_FLOW_TYPE

Use the key `NEXT_PUBLIC_FLOW_TYPE` to set the flow type. The possible values are `SelectLocationFirst` and `SelectServiceFirst`. Default is `SelectLocationFirst`.

Use `SelectLocationFirst` if you want the user to choose a location as the first step of the flow. In this case, the second step for the user would be to choose a service from the list of the services available at the chosen location. 

Use `SelectServiceFirst` if you want the user to choose a service as the first step of the flow. In this case, the second step for the user would be to choose a location from the list of the locations where the chosen service is available.


4.2. NEXT_PUBLIC_MAP_TYPE

Use the key `NEXT_PUBLIC_MAP_TYPE` to set a map provider you want to use. Possible values are `MapBox` and `Google`. Default is `MapBox`


4.3. NEXT_PUBLIC_DATE_TIME_TYPE

Use the key `NEXT_PUBLIC_DATE_TIME_TYPE` to set how the app should display appointment availability (dates & times). Possible values are `ShowTimeForOneDay` and `ShowTimeForManyDays`. Default is `ShowTimeForOneDay`.

Use `ShowTimeForOneDay` to display a single day at a time (Calendar UI).

Use `ShowTimeForManyDays` to display a list of days & times.


4.4. NEXT_PUBLIC_DISPLAY_APP_SETTINGS

You can play with these settings via the UI in the browser. To display a popup in the UI set `NEXT_PUBLIC_DISPLAY_APP_SETTINGS` to `Yes`. Default is `No`


5. Ingress point

Use an ingress point if you want to preselect a location for the user. Pass a location's externalId (set in your Boulevard Dashboard) in the `storeId` URL parameter.

Example:
```
http://localhost:3000?storeId=228
```


6. Run the dev server with the following command.

```
npm run next:dev
```
