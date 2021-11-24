# Weather Journal App Project

> This project was created as a part of Udacity's Front End Nanodegree. It is a web app which logs the weather at your current location, as well as your feelings at the time of the log.

## Description
This project is an asynchronous web app that uses the [OpenWeather](https://openweathermap.org/api) API service to provide weather information with a zip code entered by the user. Local server running on *Express* is used.

## Prerequisite
This project runs on a local server. It uses Node. If you don't have Node already installed on your machine, you can download it [**here**](https://nodejs.org/en/download/).

You also must have an API key for [OpenWeather](https://openweathermap.org/api). The sign-up page is [**here**](https://openweathermap.org/appid#signup).

After you get your API key, make a file called *.env* in the project root folder. File should contain:

```
API_KEY={your key here}
```

## Installation
If Node is installed, then you can use the Node Package Manager to install the packages needed to run this program. In the terminal, use this command:

```
$ cd Udacity_WeatherJournalApp
$ npm install
```
When those packages have installed, make builds and start the server with the following command:

```
$ node server.js
```
