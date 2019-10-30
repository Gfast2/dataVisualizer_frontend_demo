# Su's Data Visualizer

<center>
  <img src="docs/data_visualizer_demo.gif" width="100%" />
</center>

## Intro

A quick 1 day Code-Challenge demo to show _'my way'_ to implemente a simple Data Visualization tool. It's made of a simple backend (nodejs) and a React + Redux frontend. For the visualization I choose [Raphael js](https://dmitrybaranovskiy.github.io/raphael/), For the Souce Code transcompiling I use Webpack.

## Getting Started

This project is made of two repository - Front- / Backend.
First download both Repos:
```sh
mkdir -p ~/workspace/data_visualizer
cd $_
git clone https://github.com/Gfast2/dataVisualizer_backend_demo.git
git clone https://github.com/Gfast2/dataVisualizer_frontend_demo.git
```
Then install all needed packages:
```sh
cd ~/workspace/data_visualizer/dataVisualizer_frontend_demo
npm i
```
Start both front and backend in different console:

Frontend:
```sh
cd ~/workspace/data_visualizer/dataVisualizer_frontend_demo
npm run dev
```
Backend:
```sh
cd ~/workspace/data_visualizer/dataVisualizer_backend_demo/
npm start
```
Lastely open your browser and visit url:
<hostIP>:8080

**P.s.:**
Make sure port 8080 and 8081 are free on your machine. Here is the setup I used

|Part   | Type & Version                         |
|-------|----------------------------------------|
|host OS| Ubuntu Mate 18.04.2 64bit i VirtualBox |
|Nodejs | V12.13.0                               |
|Npm    | 6.12.0                                 |
|Browser| V77.0.3865.75                          |
|User OS| Windows 10 HOME 1809 17763.805         |

