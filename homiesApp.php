<?php

// mode debug
$debug = true;

//nom de l'application
$nameApp = "homiesApp";

// Inclusion des classes et librairies
require_once 'lib/core.php';
require_once $nameApp.'/controller/mainController.php';

define('ROUTE', basename(__FILE__) . '?action=');

require_once "const.php";

if($debug) {
	ini_set ("display_errors", 1);
	error_reporting (-1);
}

//action par défaut
$action = "index";

if(key_exists("action", $_REQUEST))
	$action =  $_REQUEST['action'];

session_start();

$context = context::getInstance();
$context->init($nameApp);

$view=$context->executeAction($action, $_REQUEST);

//traitement des erreurs de bases, reste a traiter les erreurs d'inclusion
if($view===false){
	//echo "Une grave erreur s'est produite, il est probable que l'action ".$action." n'existe pas...";

	$template_view=$nameApp."/view/errors/404Error.php";
	include($nameApp."/view/".$context->getLayout().".php");

	die;
}

//inclusion du layout qui va lui meme inclure le template view
elseif($view!=context::NONE){
	$template_view=$nameApp."/view/".$action.$view.".php";
	include($nameApp."/view/".$context->getLayout().".php");
}

?>
