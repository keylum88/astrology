<?php
    
    $uniqueID = uniqid();

    $interpsFilePath = 'assets/data/basic-interps.json';

    // If there is a query string
    if ( !empty($_GET) ) {

        $cmd = $_GET['cmd'];

        switch ($cmd) {

            case 'get-astrology':
                
                $interpsFile = file_get_contents($interpsFilePath);
                $interpsJSON = json_decode($interpsFile);
                $bulkTextFile = file_get_contents('assets/data/interps-bulk.txt');

                echo $interpsFile.'|||'.$bulkTextFile;

                exit();
                break;

            case 'get-view':

                $view = $_GET['view'];
                switch ($view) {

                    case 'dashboard':

                        $view = 'dashboard';

                        break;

                }

                include './views/'.$view.'.php';
                exit();

                break;

        }

    }
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Astrology</title>
    <link rel="stylesheet" href="/assets/css/main.css?id=<?=$uniqueID?>">
</head>
<body>

    <div id="view"></div>

    <script src="/assets/js/main.js?id=<?=$uniqueID?>"></script>
</body>
</html>