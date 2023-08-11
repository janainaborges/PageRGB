<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Illuminate\Database\Capsule\Manager as Capsule;

require __DIR__ . '/vendor/autoload.php';
require 'Item.php'; // Inclua o modelo Item

$app = AppFactory::create();

$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => '127.0.0.1',
    'database'  => 'mydb',
    'username'  => 'root',
    'password'  => '91482335',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

$app->get('/items', function (Request $request, Response $response, $args) {
    $items = Item::all();
    $response->getBody()->write(json_encode($items));
    return $response->withHeader('Content-Type', 'application/json');
});

// Adicione este código antes de $app->run();

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
// Adicione este código antes de $app->run();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->run();
