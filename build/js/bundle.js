!function t(i,n,e){function s(o,a){if(!n[o]){if(!i[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(r)return r(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var p=n[o]={exports:{}};i[o][0].call(p.exports,function(t){var n=i[o][1][t];return s(n?n:t)},p,p.exports,t,i,n,e)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<e.length;o++)s(e[o]);return s}({1:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){t.beginPath(),t.fillStyle="yellow",t.arc(70,70,20,0,2*Math.PI),t.fill(),t.beginPath(),t.rect(100,100,100,100),t.fillStyle="red",t.fill()},n.BirdGraphicsComponent=e},{}],2:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(){console.log("Drawing a pipe")},n.PipeGraphicsComponent=e},{}],3:[function(t,i,n){var e=t("../components/graphics/bird"),s=function(){console.log("Creating Bird entity");var t=new e.BirdGraphicsComponent(this);this.components={graphics:t}};n.Bird=s},{"../components/graphics/bird":1}],4:[function(t,i,n){var e=t("../components/graphics/pipe"),s=function(){console.log("Creating Pipe entity");var t=new e.PipeGraphicsComponent(this);this.components={graphics:t}};n.Pipe=s},{"../components/graphics/pipe":2}],5:[function(t,i,n){var e=t("./systems/graphics"),s=t("./entities/bird"),r=t("./entities/pipe"),o=function(){this.entities=[new s.Bird,new r.Pipe],this.graphics=new e.GraphicsSystem(this.entities)};o.prototype.run=function(){this.graphics.run()},n.FlappyBird=o},{"./entities/bird":3,"./entities/pipe":4,"./systems/graphics":7}],6:[function(t,i,n){var e=t("./flappy_bird");document.addEventListener("DOMContentLoaded",function(){var t=new e.FlappyBird;t.run()})},{"./flappy_bird":5}],7:[function(t,i,n){var e=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas"),this.context=this.canvas.getContext("2d")};e.prototype.run=function(){window.requestAnimationFrame(this.tick.bind(this))},e.prototype.tick=function(){this.canvas.width==this.canvas.offsetWidth&&this.canvas.height==this.canvas.offsetHeight||(this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight),this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(var t=0;t<this.entities.length;t+=1){var i=this.entities[t];!1 in i.components||i.components.graphics.draw(this.context)}window.requestAnimationFrame(this.tick.bind(this))},n.GraphicsSystem=e},{}]},{},[6]);