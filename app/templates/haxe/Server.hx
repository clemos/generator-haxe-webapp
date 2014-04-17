import js.Node;
import js.npm.connect.Static;
import js.npm.Express;

class Server {
	
	static function main(){
		
		var express = new Express();
		var dirname = Node.__dirname;
		var pub = dirname + "/public";
		var dev = Node.process.argv[2] == "dev";

		var PORT = Node.process.env.PORT;
		if( PORT == null ){
			PORT = 9000;
		}

		express.all('/', function(req,res,_){
			res.sendfile(pub+'/index.html');
		});

		if( dev ){
			express.use( new Static( dirname + "/../.tmp" ) );
			express.use( '/bower_components' , new Static( dirname + "/../bower_components" ) );
		}

		express.use( new Static( dirname + "/public" ) );

		express.use(function(req,res,_){
			res.status(404);
			res.sendfile(pub+'/404.html');
		});

		trace('listening to port $PORT');

		express.listen(PORT);
	}

}