<?php

use TYPO3\CMS\Extbase\Utility\ExtensionUtility;
use Test\Sitepackage\Controller\IrreController;
defined('TYPO3') or die;
ExtensionUtility::configurePlugin(
    'TestSitepackage',
    'InlineRecordsirre',
    [
        IrreController::class => 'index, list, show',
    ],
    [
        IrreController::class => '',
    ],
    ExtensionUtility::PLUGIN_TYPE_CONTENT_ELEMENT,
);