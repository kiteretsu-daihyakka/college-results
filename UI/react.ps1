cd .\ui

if ($args[0] -eq "s") {
    npm start
}
elseif ($args[0] -eq "b") {
    npm run build
}
elseif ($args[0] -eq "d") {
    json-server .\data.json $args[1] $args[2]
}
else {
    Write-Host "Invalid argument"
}
