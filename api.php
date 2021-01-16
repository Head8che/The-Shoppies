<?php
    header("Access-Control-Allow-Origin: https://the-shoppies-challenge-uxui.netlify.app/");
    require_once 'env.php';

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':

            $curl = curl_init();
            
            $search_condition = urldecode($_GET["query"]);

            // set our url with curl_setopt()
            if ($search_condition){
                curl_setopt($curl, CURLOPT_URL, "http://www.omdbapi.com?s=".urlencode(urldecode($_GET["query"]))."&type=Movie&apikey=".API_KEY);
            }
            else{
                curl_setopt($curl, CURLOPT_URL, "http://www.omdbapi.com?i=".urlencode(urldecode($_GET["details"]))."&type=Movie&apikey=".API_KEY);
            };

            
            
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $output = curl_exec($curl);

            echo($output);
            break;

        default:
            echo $method . 'not supported';

    }

?>