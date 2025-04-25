<?php

return [
    'required' => 'A(z) :attribute mező kitöltése kötelező.',
    'min' => [
        'string' => 'A(z) :attribute mezőnek legalább :min karakter hosszúnak kell lennie.',
    ],
    'digits' => [
        'numeric' => 'A(z) :attribute mezőnek :digits számjegyből kell állnia.',
    ],
    'before' => [
        'date' => 'A(z) :attribute mezőnek mai napnál korábbinak kell lennie.',
    ],
    'unique' => 'A(z) :attribute értéke már létezik.',
    'confirmed' => 'A jelszavak nem egyeznek.',
    'exists' => 'A kiválasztott :attribute érvénytelen.',

    'custom' => [
        'phone_number' => [
            'min' => 'A telefonszám mezőnek minimum 6 karakter hosszúnak kell lennie.',
            'max' => 'A telefonszám mezőnek maximum 16 karakter hosszúnak kell lennie.',
            'regex' => 'A telefonszám csak számokat, illetve +, -, / karaktereket tartalmazhat.',
        ],
        'taj_number' => [
            'digits' => 'A TAJ szám kizárólag 9 számjegyű lehet.',
        ],
        'password' => [
            'min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
        ],
        'birth_date' => [
            'before' => 'Csak mai napnál korábbi dátum adható meg.',
        ],
    ],

];
