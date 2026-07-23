<?php

declare(strict_types=1);

return [
    \Test\Sitepackage\Domain\Model\Irre::class => [
        'tableName' => 'tt_content',
        'properties' => [
            // Map property 'txTestsitepackeParent' to database field 'tx_testsitepacke_parent'
            #'txTestsitepackeParent' => [
            #    'fieldName' => 'tx_testsitepacke_parent',
            #],
            // CRITICAL: Map property 'childRecords' to your IRRE relation tracking field 'bodytext'
            'childRecords' => [
                'fieldName' => 'bodytext',
            ],
        ],
    ],
];
/*
return [
    \WDB\MrSitepackage\Domain\Model\Teaser::class => [
        'tableName' => 'tt_content',
    ],
    \WDB\MrSitepackage\Domain\Model\Jobbox::class => [
        'tableName' => 'tt_content',
    ],
];
*/
