<?php

declare(strict_types=1);

use TYPO3\CMS\Extbase\Utility\ExtensionUtility;
use Test\Sitepackage\Controller\IrreController;

defined('TYPO3') or die;

ExtensionUtility::configurePlugin(
    'TestSitepackage',
    'InlineRecordsIrre',
    [
        IrreController::class => 'index, list, show',
    ],
    [
        IrreController::class => '',
    ],
    ExtensionUtility::PLUGIN_TYPE_CONTENT_ELEMENT,
);
