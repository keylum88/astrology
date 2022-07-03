<?php
    
    $uniqueID = uniqid();

    $interpsFilePath = 'assets/data/basic-interps.json';

    // If there is a query string
    if ( !empty($_GET) ) {

        $cmd = $_GET['cmd'];

        switch ($cmd) {

            case 'get-astrology':
                
                $masterFile = file_get_contents('docs/_MASTER.txt');
                $definitions = preg_match_all('/[0-9A-Z]([A-Z]|[0-9])[0-9A-Z\s]+/', $masterFile, $matches);
                
                $json = '';
                $iCount = 0;

                foreach ($matches[0] as $title) {

                    $possibleDefs = explode(PHP_EOL, $title);

                    foreach ( $possibleDefs as $possibleDef) {
                        
                        $possibleDef = trim($possibleDef);
                        if ($possibleDef === '') continue;
                        if ( strlen($possibleDef) === 1) continue; 
                        
                        $json .= '"'.$possibleDef.'": "",'.PHP_EOL;
                        
                        $iCount++;

                    }

                }

                $jsonFile = file_get_contents($interpsFilePath);
                echo $jsonFile;
                file_put_contents($interpsFilePath, $json);

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