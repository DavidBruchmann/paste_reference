/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
import $ from "jquery";
import DocumentService from "@typo3/core/document-service.js";
import DataHandler from "@typo3/backend/ajax-data-handler.js";
import { default as Modal } from "@typo3/backend/modal.js";
import Severity from "@typo3/backend/severity.js";
import "@typo3/backend/element/icon-element.js";
import { SeverityEnum } from "@typo3/backend/enum/severity.js";
import RegularEvent from "@typo3/core/event/regular-event.js";
import Paste from "@typo3/backend/layout-module/paste.js";
// import DragDrop from "@typo3/backend/layout-module/drag-drop.js";
import DragDrop from "@ehaerer/paste-reference/paste-reference-drag-drop.js";
import { MessageUtility } from "@typo3/backend/utility/message-utility.js";



class PasteReference extends Paste {
  /**
   * activates the paste into / paste after
   * and fetch copy from another page icons outside of the context menus
   */
  activatePasteIcons() {
    console.log('Paste.activatePasteIcons');
    $('.icon-actions-document-paste-into').parent().remove();
    $('.t3-page-ce-wrapper-new-ce').each(function () {
      if (!$(this).find('.icon-actions-add').length) {
        return true;
      }
      $(this).addClass('btn-group btn-group-sm');
      $('.t3js-page-lang-column .t3-page-ce > .t3-page-ce').removeClass('t3js-page-ce');
      if (top.pasteAfterLinkTemplate && top.pasteIntoLinkTemplate) {
        var parent = $(this).parent();
        if (parent.data('page') || (parent.data('container') && !parent.data('uid'))) {
          $(this).append(top.pasteIntoLinkTemplate);
        } else {
          $(this).append(top.pasteAfterLinkTemplate);
        }
        $(this).find('.t3js-paste').on('click', function (evt) {
          evt.preventDefault();
          Paste.activatePasteModal($(this));
        });
      }
      if (Paste.pasteAfterLinkTemplate && Paste.pasteIntoLinkTemplate) {
        var parent = $(this).parent();
        if (parent.data('page') || (parent.data('container') && !parent.data('uid'))) {
          $(this).append(Paste.pasteIntoLinkTemplate);
        } else {
          $(this).append(Paste.pasteAfterLinkTemplate);
        }
      }
      $(this).append(top.copyFromAnotherPageLinkTemplate);
      $(this).find('.t3js-paste-new').on('click', function (evt) {
        evt.preventDefault();
        OnReady.copyFromAnotherPage($(this));
      });
    });
  };

  /**
   * generates the 'paste into / paste after' modal
   */
  activatePasteModal() {
    console.log('Paste.activatePasteModal');
    var $element = $(element);
    var url = $element.data('url') || null;
    var elementTitle = this.itemOnClipboardTitle != undefined ? this.itemOnClipboardTitle : "["+TYPO3.lang['tx_paste_reference_js.modal.labels.no_title']+"]";
    var title = (TYPO3.lang['paste.modal.title.paste'] || 'Paste record') + ': "' + elementTitle + '"';
    var severity = (typeof top.TYPO3.Severity[$element.data('severity')] !== 'undefined') ? top.TYPO3.Severity[$element.data('severity')] : top.TYPO3.Severity.info;
    if ($element.hasClass('t3js-paste-copy')) {
      var content = TYPO3.lang['tx_paste_reference_js.modal.pastecopy'] || '1 How do you want to paste that clipboard content here?';
      var buttons = [
        {
          text: TYPO3.lang['paste.modal.button.cancel'] || 'Cancel',
          active: true,
          btnClass: 'btn-default',
          trigger: function () {
            Modal.currentModal.trigger('modal-dismiss');
          }
        },
        {
          text: TYPO3.lang['tx_paste_reference_js.modal.button.pastecopy'] || 'Paste as copy',
          btnClass: 'text-white btn-' + top.TYPO3.Severity.getCssClass(severity),
          trigger: function (ev) {
            Modal.currentModal.trigger('modal-dismiss');
            DragDrop.default.onDrop($element.data('content'), $element, ev);
          }
        },
        {
          text: TYPO3.lang['tx_paste_reference_js.modal.button.pastereference'] || 'Paste as reference',
          btnClass: 'text-white btn-' + top.TYPO3.Severity.getCssClass(severity),
          trigger: function (ev) {
            Modal.currentModal.trigger('modal-dismiss');
            DragDrop.default.onDrop($element.data('content'), $element, ev, 'reference');
          }
        }
      ];
      if (top.pasteReferenceAllowed !== true) {
        buttons.pop();
      }
    } else {
      var content = TYPO3.lang['paste.modal.paste'] || 'Do you want to move the record to this position?';
      var buttons = [
        {
          text: TYPO3.lang['paste.modal.button.cancel'] || 'Cancel',
          active: true,
          btnClass: 'btn-default',
          trigger: function () {
            Modal.currentModal.trigger('modal-dismiss');
          }
        },
        {
          text: TYPO3.lang['paste.modal.button.paste'] || 'Move',
          btnClass: 'btn-' + Severity.getCssClass(severity),
          trigger: function () {
            Modal.currentModal.trigger('modal-dismiss');
            DragDrop.default.onDrop($element.data('content'), $element, null);
          }
        }
      ];
    }
    if (url !== null) {
      var separator = (url.indexOf('?') > -1) ? '&' : '?';
      var params = $.param({data: $element.data()});
      Modal.loadUrl(title, severity, buttons, url + separator + params);
    } else {
      Modal.show(title, content, severity, buttons);
    }
    console.log('Modal', Modal);
  };

}

// export PasteReference;

export default (function() {

  let OnReady = {
    openedPopupWindow: []
  }
  /**
   * Main init function called from outside
   *
   * Sets some options and registers the DOMready handler to initialize further things
   *
   * @param {String} browserUrl
  FormEngine.initialize = function (browserUrl) {
    FormEngine.browserUrl = browserUrl;
    DocumentService.ready().then(() => {
      FormEngine.initializeEvents();
      FormEngine.Validation.initialize();
      FormEngine.reinitialize();
      $('#t3js-ui-block').remove();
    });
  };
   */



  /**
   * generates the paste into / paste after modal
   */
  OnReady.copyFromAnotherPage = function (element) {
    console.log('copyFromAnotherPage');
    var url = top.browserUrl + '&mode=db&bparams=' + element.parent().attr('id') + '|||tt_content|';
    var configurationIframe = {
      type: Modal.types.iframe,
      content: url,
      size: Modal.sizes.large
    };
    Modal.advanced(configurationIframe);
  };

  /**
   * gives back the data from the popup window to the copy action
   */
  if (!$('.typo3-TCEforms').length) {
    // function (MessageUtility) {
    window.addEventListener('message', function (e) {

      if (!MessageUtility.MessageUtility.verifyOrigin(e.origin)) {
        throw 'Denied message sent by ' + e.origin;
      }

      if (typeof e.data.fieldName === 'undefined') {
        throw 'fieldName not defined in message';
      }

      if (typeof e.data.value === 'undefined') {
        throw 'value not defined in message';
      }

      const result = e.data.value;
      var tableUid = result.replace('tt_content_', '') * 1;
      var elementId = e.data.fieldName;
      DragDrop.default.onDrop(tableUid, $('#' + elementId).find('.t3js-paste-new'), 'copyFromAnotherPage');
    });
  };

  // $(OnReady.initialize);
  //console.log('OnReady', OnReady);
  //console.log('Paste', Paste);
  //Paste.initializeEvents();
  // new Paste();
  return OnReady;
});
