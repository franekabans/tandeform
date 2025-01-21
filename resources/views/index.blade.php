<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Tandemite Form App</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')  <!-- Make sure this is correct -->
</head>
<body>
    <div id="app"></div>  <!-- This should match the React root element -->
</body>
</html>
