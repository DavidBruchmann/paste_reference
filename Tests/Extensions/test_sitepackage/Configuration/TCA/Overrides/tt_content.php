<?php

#declare(strict_types=1);
use B13\Container\Tca\ContainerConfiguration;
use B13\Container\Tca\Registry;
use TYPO3\CMS\Core\Information\Typo3Version;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
#use TYPO3\CMS\Core\Utility\VersionNumberUtility;
use TYPO3\CMS\Extbase\Utility\ExtensionUtility;

#defined('TYPO3') or die();
// Register container element ce_columns2 for container extension v3.x
$containerRegistry = GeneralUtility::makeInstance(Registry::class);
$containerConfiguration = new ContainerConfiguration(
    'ce_columns2',

    // CType
    'Two Columns Container',

    // label
    'Two column container for content elements',

    // description
    [
        [
            [
                'name' => 'Left Column',
                'colPos' => 101,
            ],
            [
                'name' => 'Right Column',
                'colPos' => 102,
            ],
        ],
    ]
);
$containerConfiguration->setIcon(
    'EXT:test_sitepackage/Resources/Public/Icons/ce_columns2.svg',
);
$containerConfiguration->setSaveAndCloseInNewContentElementWizard(false);
$containerRegistry->configureContainer($containerConfiguration);

// Add the container to the content element wizard
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'label' => 'Two Columns Container',
        'value' => 'ce_columns2',
        'icon' => 'content-container-columns-2',
        'group' => 'container',
        'description' => 'Container with two columns for content elements',
    ],
);

# ExtensionManagementUtility::addTCAcolumns('tt_content',[
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'tt_content',
    [
        'tx_testsitepacke_parent' => [
             'label' => 'Inline Element parent field',

            # 'description' => 'Group several content elements',
            'config' => [
                'type' => 'passthrough',
            ],
        ],
    ],
);

/*
$GLOBALS['TCA']['tt_content']['columns']['bodytext'] = [
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
     'tt_content',
     'general',
     'tx_testsitepacke_parent',
     #'before:editlock'
  );
$GLOBALS['TCA']['tt_content']['types']['tx_testsitepacke_parent']['showitem']=

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'fe_users',
    'tx_myextension_options, tx_myextension_special',
    '',
    'after:password',
);
*/
# Relation: 1:n
# https://docs.typo3.org/permalink/t3tca:tca-example-inline-1n-inline-1
$GLOBALS['TCA']['tt_content']['types']['tx_testsitepacke_parent'] = $GLOBALS['TCA']['tt_content']['types']['text'];
# $GLOBALS['TCA']['tt_content']['types']['tx_testsitepacke_parent']['columnsOverrides']['bodytext'] =

$inlineConfig = [
    'type' => 'inline',
    'foreign_table' => 'tt_content',
    'foreign_field' => 'tx_testsitepacke_parent',
    'foreign_table_field' => 'tablenames',
    'appearance' => [
        'showSynchronizationLink' => true,
        'showAllLocalizationLink' => true,
        'showPossibleLocalizationRecords' => true,
    ],
];

$versionObj = GeneralUtility::makeInstance(Typo3Version::class);
$currentMajorVersion = (int)explode('.', $versionObj->getVersion())[0];
#debug($currentMajorVersion);
if ($currentMajorVersion >= 14) {
    $inlineConfig['appearance']['hideFieldsWithNoSelectableItems'] = true;
}

$tcaOverride = [
    'label' => 'Inline Elements',
    'description' => 'Group several content elements',
    'exclude' => 0,
    'config' => $inlineConfig,
];
if ($currentMajorVersion < 14){
    $tcaOverride['displayCond'] = 'REC:NEW:false';
}

$GLOBALS['TCA']['tt_content']['types']['tx_testsitepacke_parent']['columnsOverrides']['bodytext'] = $tcaOverride;

ExtensionUtility::registerPlugin(
    'TestSitepackage',
    'InlineRecordsirre',
    'Inline Records (IRRE)',
    'ext-test-sitepackage-plugin',
    'plugins',
    'Simple Content Element with IRRE relations',
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'label' => 'Content Element with Inline Records (IRRE)', // The label shown to users
        'value' => 'tx_testsitepacke_parent',           // Must match your element name
        'icon' => 'tx-testsitepacke-parent-icon',              // Optional: An existing core icon
        'group' => 'special'                            // Dropdown group (default, special, etc.)
    ]
);
// Assign your registered icon identifier to the CType for the Backend Layout view
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['tx_testsitepacke_parent'] = 'tx-testsitepacke-parent-icon';
