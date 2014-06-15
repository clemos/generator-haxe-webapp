# Haxe web app generator for Yeoman

[Yeoman](http://yeoman.io/) is a fantastic tool for quickly scaffolding projects that are easy to test, build and deploy.

This project is basically a fork of Yeoman's official [generator-webapp](https://github.com/yeoman/generator-webapp), that adds [Haxe](http://haxe.org)/JS support (including node.js).

It has all the same features than `generator-webapp`, **except** :
* Coffeescript support : Why exactly would we need it :)
* Mocha Unit tests : removed for now
* jshint : most Haxe generated JS code will fail jshint

The project currently requires that you install [haxe-js-kit](https://github.com/clemos/haxe-js-kit) as an haxelib.

It makes use of the great [grunt-haxe](https://github.com/Fintan/grunt-haxe) tasks.

### Installation

Install yeoman:

```bash
npm install -g yo
```

generator-haxe-webapp is not published as an NPM package yet, so if you want to test, you'll need to :
```bash
git clone https://github.com/clemos/generator-haxe-webapp.git
cd generator-haxe-webapp
npm link
```
You also need to install the `js-kit` haxelib :
```bash
haxelib git js-kit https://github.com/clemos/haxe-js-kit.git haxelib
```

### Usage

In a new directory, type :
```bash
yo haxe-webapp
```
The directory layout is pretty similar to `generator-webapp`'s, except :
* `app/public` is the "document root" rather than `app`
* `haxe` folder contains base code for a Server/Client app

You can test your app locally using :
```bash
grunt serve
```
And then open [localhost:9000](http://localhost:9000) in your browser.

You can build an optimised version, ready to be deployed, with :
```bash
grunt
```
