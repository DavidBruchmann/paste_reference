<?php /** @noinspection PhpUndefinedVariableInspection */

$EM_CONF[$_EXTKEY] = [
    'title' => 'Test Sitepackage',
    'description' => 'Simple sitepackage for testing paste-reference with container extension',
    'category' => 'templates',
    'author' => 'David Bruchmann',
    'author_email' => 'david.bruchmann@gmail.com',
    'state' => 'stable',
    'version' => '1.1.0',
    'constraints' => [
        'depends' => [
            'typo3' => '12.0.0-14.99.99',
            'container' => '3.0.0-3.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
