# Haxe web app generator for Yeoman

This is basically a fork of Yeoman's official [generator-webapp](https://github.com/yeoman/generator-webapp), so it has all the same features, **except** :
* Coffeescript support : Why exactly would we need it :)
* Mocha Unit tests : removed for now
* jshint : most Haxe generated JS code will fail jshint

The project currently requires that you install [haxe-js-kit](https://github.com/clemos/haxe-js-kit) as an haxelib.

It makes use of the great [grunt-haxe](https://github.com/Fintan/grunt-haxe) tasks.

### Installation

It's not published as an NPM package yet, so if you want to test, you'll need to :
```
git clone https://github.com/clemos/generator-haxe-webapp.git
cd generator-haxe-webapp
npm link
```

### Usage

In a new directory, type :
```
yo haxe-webapp
```
The directory layout is pretty similar to `generator-webapp`'s, except :
* `app/public` is the "document root" rather than `app`
* `haxe` folder contains base code for a Server/Client app

You can test your app locally using
```
grunt serve
```
and build an optimised version, ready to be deployed, with :
```
grunt
```
