# restaurant-reviewer

Public Transportation App, Project 3 from Udacity Senior Web Developer Nanodegree. It's a responsive app.  
### Requirement  
> You will develop a restaurant review application with a focus on accessibility. You will remotely access JSON files containing restaurant information (including name, a photograph, address, cuisine type and operating hours) as well as JSON files containing review information for each restaurant (name of reviewer, date of review, 5-star rating and comments). The reviews application must include an application header, and a menu providing multiple ways to filter the restaurants (by cuisine, by location, etc). When viewing a specific restaurant, current reviews must be displayed along with a form for the user to submit their own review.  

> Udacity

##[Demo]()  
You can see a demo [here]().  

### Mobile  
<!-- <img src="https://raw.githubusercontent.com/mortoni/LA-train/master/app/images/demo1.png" width="393" height="800" />   -->
### Desktop  
<!-- ![image](https://raw.githubusercontent.com/mortoni/LA-train/master/app/images/demo2.png)   -->

##Technologies
[AngularJS](https://angularjs.org/)  
[Firebase](https://www.firebase.com/)  
JavaScript  
HTML5  
CSS3  
Gulp
BootStrap 3  
JQuery  

##Dependencies
- **Node.js**  
You must download and install it [here](https://nodejs.org/en/).  

##Running
Go to root folder of project, open your terminal and then follow steps:  
###Development Server  
- Installing dependencies:
```{r, engine='bash', count_lines}
$ npm install
```

- Download packages:  
```{r, engine='bash', count_lines}
$ bower install
```

- Running server:  
```{r, engine='bash', count_lines}
$ npm run gulp server:dev
```
###Distribution Server  
- Generate distribution:  
```{r, engine='bash', count_lines}
$ gulp dist
```

- Running server:  
```{r, engine='bash', count_lines}
$ npm run gulp server:dist
```

##Features  
**Version 1.0.0**  
- First commit
