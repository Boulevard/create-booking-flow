[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![GitHub license](https://img.shields.io/github/license/Boulevard/create-booking-flow)](https://github.com/Boulevard/create-booking-flow/blob/master/LICENSE.md)
[![GitHub release](https://img.shields.io/github/release/Boulevard/create-booking-flow)](https://github.com/Boulevard/create-booking-flow/releases/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Boulevard/create-booking-flow/compare)

<div align="center">
  <h2 align="center">Create Booking Flow starter kit</h2>

  <p align="center">
    <a href="https://github.com/Boulevard/create-booking-flow/issues">Report a Bug</a>
    ·
    <a href="https://github.com/Boulevard/create-booking-flow/issues">Request a Feature</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#setup-and-run">Setup and run</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#issues">Issues</a></li>
  </ol>
</details>

<hr />

## About the project
<br />

![Screenshot - After choosing the service and the service provider you will be presented with the date/time selection step](https://user-images.githubusercontent.com/100217514/157887586-8c9a5773-d49c-4943-8e21-fb92297fa82b.png)

<br />

Create Booking Flow is the easiest way to have a custom booking flow for your [Boulevard](https://joinblvd.com) integration. By just providing basic information, your Business ID and your API Key, you can have this project up and running. This enables you to customize your Boulevard integration easily, and gives you the power to provide a seamless experience to your end users.

The starter kit has MapBox and Google Maps built in, alongside Google Analytics. It also has 
multiple flows that control how the user booking flow looks like, and it's all a matter of changing the `env` configuration.

## Setup and run

This is a [typescript](https://www.typescriptlang.org/) project so it requires some experience with typescript to be able to do advanced customizations with the project. It uses [Next.js](https://nextjs.org/) framework with Material UI on top of it. 

To setup the project locally follow these steps:

1. Configure your environment. The following tools must be installed before you start.

- NodeJS
- Yarn package manager (can be installed via npm by running `npm install -g yarn`)
- ts-node `npm install -g ts-node`

2. Install all required packages for the project by running the following command.

    ```
    yarn
    ```

3. To connect to a Boulevard dashboard, manually set the following values in the `.env` file. Reach out to dev-support@blvd.co to request a developer sandbox and retrieve these values. Note: must be a current Boulevard customer with an Enterprise license.

    Required info:

    ```dosini
    NEXT_PUBLIC_BLVD_BUSINESS_ID=VALID_ID_HERE
    NEXT_PUBLIC_BLVD_API_KEY=VALID_KEY_HERE
    ```
    Optional:

    ```dosini
    NEXT_PUBLIC_MAPBOX_TOKEN=VALID_KEY_HERE
    GOOGLE_MAPS_API_KEY_DEVELOPMENT=VALID_KEY_HERE
    GOOGLE_ANALYTICS_KEY=VALID_KEY_HERE
    NEXT_PUBLIC_BLVD_PLATFORM=
    ```

4. You can customize a few primary aspects of your booking flow very easily using the App UI settings in the .env file.

    **4.1.** *NEXT_PUBLIC_FLOW_TYPE*

    Use the key `NEXT_PUBLIC_FLOW_TYPE` to set the flow type. The possible values are `SelectLocationFirst` and `SelectServiceFirst`. Default is `SelectLocationFirst`.

    Use `SelectLocationFirst` if you want the user to choose a location as the first step of the flow. In this case, the second step for the user would be to choose a service from the list of the services available at the chosen location. 

    Use `SelectServiceFirst` if you want the user to choose a service as the first step of the flow. In this case, the second step for the user would be to choose a location from the list of the locations where the chosen service is available.


    **4.2.** NEXT_PUBLIC_MAP_TYPE

    Use the key `NEXT_PUBLIC_MAP_TYPE` to set a map provider you want to use. Possible values are `MapBox`, `Google` and 'None'. Default is `MapBox`


    **4.3.** NEXT_PUBLIC_DATE_TIME_TYPE

    Use the key `NEXT_PUBLIC_DATE_TIME_TYPE` to set how the app should display appointment availability (dates & times). Possible values are `ShowTimeForOneDay` and `ShowTimeForManyDays`. Default is `ShowTimeForOneDay`.

    Use `ShowTimeForOneDay` to display a single day at a time (Calendar UI).

    Use `ShowTimeForManyDays` to display a list of days & times.


    **4.4.** NEXT_PUBLIC_DISPLAY_APP_SETTINGS

    You can play with these settings via the UI in the browser. To display a popup in the UI set `NEXT_PUBLIC_DISPLAY_APP_SETTINGS` to `Yes`. Default is `No`

    **4.5.** NEXT_PUBLIC_BLVD_PLATFORM

    This env key controls the API host target. If you set the value to `live` the starter kit will target the Boulevard production API. You need to have production credentials to be able to do this.

5. Ingress point

    Use an ingress point if you want to preselect a location for the user. Pass a location's externalId (set in your Boulevard Dashboard) in the `storeId` URL parameter.

    Example:
    ```
    http://localhost:3000?storeId=228
    ```


6. Run the dev server with the following command.

    ```
    yarn run next:build
    yarn run next:dev
    ```

## Contributing
Pull requests are welcome. See the [contribution guidelines](https://github.com/Boulevard/create-booking-flow/blob/master/CONTRIBUTING.md) for more information.

## Issues

If you encounter any problems while trying to run the starter kit please create an issue.


