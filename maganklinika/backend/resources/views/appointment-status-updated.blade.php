<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Időpont státusz változás</title>
</head>
<body>
    <h2>Kedves {{ $patient->name }}!</h2>

    <p>Az Ön által foglalt időpont státusza megváltozott.</p>

    <p><strong>Időpont: </strong>{{ $appointment->start_time }}</p>
    <p><strong>Státusz: </strong>
    @switch($status)
        @case('b')
            Foglalva
            @break
        @case('c')
            Törölve orvos által
            @break
        @case('d')
            Kezelés lezárva
            <p><strong>Leírás: </strong>{{ $appointment->description}}</p>
            @break
        @default
            Visszamondva
    @endswitch
    </p>

    <p>Ha bármilyen kérdése van, forduljon hozzánk bizalommal.</p>

    <p>Üdvözlettel,<br>Az Ön egészségügyi csapata</p>
</body>
</html>
