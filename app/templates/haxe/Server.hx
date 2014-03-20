import js.Node;
import js.npm.connect.Static;
import js.npm.Express;

class Server {
	
	static function main(){
		
		var express = new Express();
		var dirname = Node.__dirname;
		var PORT = 9000;

		express.use( new Static( dirname + "/../.tmp" ) );
		express.use( '/bower_components' , new Static( dirname + "/../bower_components" ) );
		express.use( new Static( dirname + "/public" ) );

		trace('listening to port $PORT');

		express.listen(PORT);
	}

}