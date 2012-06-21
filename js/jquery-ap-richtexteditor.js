/*
* jQuery rich text editor plugin 0.0.a1 - Rich text editor (Chrome, Mozilla, Opera, Safari, Internet Explorer)
*
* Copyright (c) 2012 Thierry Charbonnel
* Distributed under the MIT License.
*/

(function($) {
    
    var methods = {
        init: function(options) {
            var settings = $.extend({
                isMSIE : (navigator.appVersion.indexOf("MSIE") != -1),
                eventSuffix: 'ApRichTextEditor' ,
                css: 'css/apRichTextEditor.css',
                autoResize: true,
                buttons: {
                    backColor: // Changes the document background color. In styleWithCss mode, it affects the background color of the containing block instead. This requires a color value string to be passed in as a value argument. (Internet Explorer uses this to set text background color.)
                    {
                        label: 'backColor',
                        action: 'backColor',
                        args: '#FFFF00'
                    },
                    
                    bold: // Toggles bold on/off for the selection or at the insertion point. (Internet Explorer uses the STRONG tag instead of B.)
                    {
                        label: 'bold',
                        action: 'bold',
                        args: false
                    },
                    contentReadOnly: //Makes the content document either read-only or editable. This requires a boolean true/false to be passed in as a value argument. (Not supported by Internet Explorer.)
                    {
                        label: 'contentReadOnly',
                        action: 'contentReadOnly',
                        args: false
                    },
                    copy: //Copies the current selection to the clipboard. Clipboard capability must be enabled in the user.js preference file. See [1]
                    {
                        label: 'copy',
                        action: 'copy',
                        args: false
                    },
                    createLink: //Creates an anchor link from the selection, only if there is a selection. This requires the HREF URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)
                    {
                        label: 'createLink',
                        action: 'createLink',
                        args: 'http://www.ap.cx/'
                    },
                    cut: //Cuts the current selection and copies it to the clipboard. Clipboard capability must be enabled in the user.js preference file. See [2]
                    {
                        label: 'cut',
                        action: 'cut',
                        args: false
                    },
                    decreaseFontSize: //Adds a SMALL tag around the selection or at the insertion point. (Not supported by Internet Explorer.)
                    {
                        label: 'decreaseFontSize',
                        action: 'decreaseFontSize',
                        args: false,
                        ie: false
                    },
                    deleteIt: //Deletes the current selection.
                    {
                        label: 'delete',
                        action: 'delete',
                        args: false
                    },
                    enableInlineTableEditing: //Enables or disables the table row and column insertion and deletion controls. (Not supported by Internet Explorer.)
                    {
                        label: 'enableInlineTableEditing',
                        action: 'enableInlineTableEditing',
                        args: false,
                        ie: false
                    },
                    enableObjectResizing: //Enables or disables the resize handles on images and other resizable objects. (Not supported by Internet Explorer.)
                    {
                        label: 'enableObjectResizing',
                        action: 'enableObjectResizing',
                        args: false,
                        ie: false
                    },
                    /*
                    fontName: //Changes the font name for the selection or at the insertion point. This requires a font name string ("Arial" for example) to be passed in as a value argument.
                    {
                        label: 'fontName',
                        action: 'fontName',
                        args: 'helvetica'
                    },
                    */
                    /*
                    fontSize: //Changes the font size for the selection or at the insertion point. This requires an HTML font size (1-7) to be passed in as a value argument.
                    {
                        label: 'fontSize',
                        action: 'fontSize',
                        args: false
                    },
                    */
                    foreColor: //Changes a font color for the selection or at the insertion point. This requires a color value string to be passed in as a value argument.
                    {
                        label: 'foreColor',
                        action: 'foreColor',
                        args: '#FF0000'
                    },
                    formatBlock: //Adds an HTML block-style tag around the line containing the current selection, replacing the block element containing the line if one exists (in Firefox, BLOCKQUOTE is the exception - it will wrap any containing block element). Requires a tag-name string to be passed in as a value argument. Virtually all block style tags can be used (eg. "H1", "P", "DL", "BLOCKQUOTE"). (Internet Explorer supports only heading tags H1 - H6, ADDRESS, and PRE, which must also include the tag delimiters < >, such as "<H1>".)
                    {
                        label: 'formatBlock',
                        action: 'formatBlock',
                        args: 'p'
                    },
                    heading: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H1',
                        action: 'heading',
                        args: 'h1',
                        ieAction: 'formatBlock'
                    },
                    headingH2: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H2',
                        action: 'heading',
                        args: 'h2',
                        ieAction: 'formatBlock'
                    },
                    headingH3: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H3',
                        action: 'heading',
                        args: 'h3',
                        ieAction: 'formatBlock'
                    },
                    headingH4: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H4',
                        action: 'heading',
                        args: 'h4',
                        ieAction: 'formatBlock'
                    },
                    paragraph: //Adds an HTML block-style tag around the line containing the current selection, replacing the block element containing the line if one exists (in Firefox, BLOCKQUOTE is the exception - it will wrap any containing block element). Requires a tag-name string to be passed in as a value argument. Virtually all block style tags can be used (eg. "H1", "P", "DL", "BLOCKQUOTE"). (Internet Explorer supports only heading tags H1 - H6, ADDRESS, and PRE, which must also include the tag delimiters < >, such as "<H1>".)
                    {
                        label: 'paragraph',
                        action: 'formatBlock',
                        args: 'p'
                    },
                    hiliteColor: //Changes the background color for the selection or at the insertion point. Requires a color value string to be passed in as a value argument. UseCSS must be turned on for this to function. (Not supported by Internet Explorer.)
                    {
                        label: 'hiliteColor',
                        action: 'hiliteColor',
                        args: '#FFFF00',
                        ie: false
                    },
                    increaseFontSize: //Adds a BIG tag around the selection or at the insertion point. (Not supported by Internet Explorer.)
                    {
                        label: 'increaseFontSize',
                        action: 'increaseFontSize',
                        args: false,
                        ie: false
                    },
                    indent: //Indents the line containing the selection or insertion point. In Firefox, if the selection spans multiple lines at different levels of indentation, only the least indented lines in the selection will be indented.
                    {
                        label: 'indent',
                        action: 'indent',
                        args: false,
                        ie: false
                    },
                    insertBrOnReturn: //Controls whether the Enter key inserts a br tag or splits the current block element into two. (Not supported by Internet Explorer.)
                    {
                        label: 'insertBrOnReturn On',
                        action: 'insertBrOnReturn',
                        args: true,
                        ie: false
                    },
                    insertBrOnReturnOff: //Controls whether the Enter key inserts a br tag or splits the current block element into two. (Not supported by Internet Explorer.)
                    {
                        label: 'insertBrOnReturn Off',
                        action: 'insertBrOnReturn',
                        args: false,
                        ie: false
                    },
                    insertHorizontalRule: //Inserts a horizontal rule at the insertion point (deletes selection).
                    {
                        label: 'insertHorizontalRule',
                        action: 'insertHorizontalRule',
                        args: false
                    },
                    insertHTML: //Inserts an HTML string at the insertion point (deletes selection). Requires a valid HTML string to be passed in as a value argument. (Not supported by Internet Explorer.)
                    {
                        label: 'insertHTML',
                        action: 'insertHTML',
                        args: false,
                        ie: false
                    },
                    insertImage: //Inserts an image at the insertion point (deletes selection). Requires the image SRC URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)
                    {
                        label: 'insertImage',
                        action: 'insertImage',
                        args: 'http://gravatar.com/emails/'
                    },
                    insertOrderedList: //Creates a numbered ordered list for the selection or at the insertion point.
                    {
                        label: 'insertOrderedList',
                        action: 'insertOrderedList',
                        args: false
                    },
                    insertUnorderedList: //Creates a bulleted unordered list for the selection or at the insertion point.
                    {
                        label: 'insertUnorderedList',
                        action: 'insertUnorderedList',
                        args: false
                    },
                    insertParagraph: //Inserts a paragraph around the selection or the current line. (Internet Explorer inserts a paragraph at the insertion point and deletes the selection.)
                    {
                        label: 'insertParagraph',
                        action: 'insertParagraph',
                        args: false
                    },
                    italic: //Toggles italics on/off for the selection or at the insertion point. (Internet Explorer uses the EM tag instead of I.)
                    {
                        label: 'italic',
                        action: 'italic',
                        args: false
                    },
                    justifyCenter: //Centers the selection or insertion point.
                    {
                        label: 'justifyCenter',
                        action: 'justifyCenter',
                        args: false
                    },
                    justifyLeft: //Justifies the selection or insertion point to the left.
                    {
                        label: 'justifyLeft',
                        action: 'justifyLeft',
                        args: false
                    },
                    justifyRight: //Right-justifies the selection or the insertion point.
                    {
                        label: 'justifyRight',
                        action: 'justifyRight',
                        args: false
                    },
                    justifyFull: //Right-justifies the selection or the insertion point.
                    {
                        label: 'justifyFull',
                        action: 'justifyFull',
                        args: false
                    },
                    outdent: //Outdents the line containing the selection or insertion point.
                    {
                        label: 'outdent',
                        action: 'outdent',
                        args: false
                    },
                    paste: //Pastes the clipboard contents at the insertion point (replaces current selection). Clipboard capability must be enabled in the user.js preference file. See [3]
                    {
                        label: 'paste',
                        action: 'paste',
                        args: false
                    },
                    redo: //Redoes the previous undo command.
                    {
                        label: 'redo',
                        action: 'redo',
                        args: false
                    },
                    removeFormat: //Removes all formatting from the current selection.
                    {
                        label: 'removeFormat',
                        action: 'removeFormat',
                        args: false
                    },
                    selectAll: //Selects all of the content of the editable region.
                    {
                        label: 'selectAll',
                        action: 'selectAll',
                        args: false
                    },
                    strikeThrough: //Toggles strikethrough on/off for the selection or at the insertion point.
                    {
                        label: 'strikeThrough',
                        action: 'strikeThrough',
                        args: false
                    },
                    subscript: //Toggles subscript on/off for the selection or at the insertion point.
                    {
                        label: 'subscript',
                        action: 'subscript',
                        args: false
                    },
                    superscript: //Toggles superscript on/off for the selection or at the insertion point.
                    {
                        label: 'superscript',
                        action: 'superscript',
                        args: false
                    },
                    underline: //Toggles underline on/off for the selection or at the insertion point.
                    {
                        label: 'underline',
                        action: 'underline',
                        args: false
                    },
                    undo: //Undoes the last executed command.
                    {
                        label: 'undo',
                        action: 'undo',
                        args: false
                    },
                    unlink: //Removes the anchor tag from a selected anchor link.
                    {
                        label: 'unlink',
                        action: 'unlink',
                        args: false
                    },
                    styleWithCSS: //Replaces the useCSS command; argument works as expected, i.e. true modifies/generates style attributes in markup, false generates formatting elements.
                    {
                        label: 'styleWithCSS',
                        action: 'styleWithCSS',
                        args: 'border: 1px solid #969696;'
                    },
                    normalize: //Replaces the useCSS command; argument works as expected, i.e. true modifies/generates style attributes in markup, false generates formatting elements.
                    {
                        label: 'normalize',
                        action: 'normalize',
                        args: false
                    }
                },
                buttonsList: [
                    //'backColor',
                    'heading',
                    'headingH2',
                    'headingH3',
                    'headingH4',
                    'paragraph',
                    'SP',
                    
                    'bold',
                    'italic',
                    'SP',
                    
                    'justifyLeft',
                    'justifyCenter',
                    'justifyRight',
                    'justifyFull',
                    'SP',
                    
                    'outdent',
                    'indent',
                    'SP',
                    
                    'insertOrderedList',
                    'insertUnorderedList',
                    'SP',
                    
                    'undo',
                    'redo',
                    'SP',
                    
                    'createLink',
                    'unlink',
                    'SP',
                    
                    'removeFormat'
                    //'contentReadOnly',
                    
                    //'decreaseFontSize',
                    //'enableInlineTableEditing',
                    //'enableObjectResizing',
                    //'fontName',
                    //'fontSize',
                    
                    
                    //'increaseFontSize',
                    
                    //'insertBrOnReturn',
                    //'insertBrOnReturnOff',
                    
                ],
                buttonsOptionsList: {
                    edit: {
                        label: 'Edit',
                        items: [
                            'copy',
                            'cut',
                            'paste',
                            'selectAll',
                            'deleteIt'
                        ]
                    },
                    insert: {
                        label: 'Insert',
                        items: [
                            'insertHorizontalRule',
                            'insertHTML',
                            'insertImage',
                            'insertParagraph',
                            'normalize',
                            'removeFormat'
                        ]
                    },
                    formatFont: {
                        label: 'Format Font',
                        items: [
                            'strikeThrough',
                            'styleWithCSS',
                            'subscript',
                            'superscript',
                            'underline',
                            'foreColor',
                            'hiliteColor'
                        ]
                    }
                    
                },
                nextTagRules: {
                    'h1': 'h2',
                    'h2': 'h3',
                    'h3': 'p',
                    'h4': 'p'
                },
                removeTags: [
                    'font', 'style', 'script'
                ]
            }, options);
            
            var paragraphTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'plaintext', 'pre'];
            var prohibitedParagraphChildNames = ['address', 'article', 'aside',
                'blockquote', 'caption', 'center', 'col', 'colgroup', 'dd', 'details',
                'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer',
                'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li',
                'listing', 'menu', 'nav', 'ol', 'p', 'plaintext', 'pre', 'section',
                'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
                'xmp'];
            
            /*
             * enableDesignMode
             */
            return this.each(function() {
                var $this = $(this);
                var src = this;
                var data = $this.data('apRichTextEditor');         
                if (!data) {
                    data = {
                        settings: settings
                    };
                    $this.data('apRichTextEditor', data);
                }
                var $editorDiv = $('<div/>').addClass('apRichTextEditor');
                $editorDiv.data('apRichTextEditor', {src: $this});
                
                var $iframe = $('<iframe/>');
                $iframe.attr('frameborder', 0).attr('framemargin', 0).attr('framepadding', 0).addClass('apRichTextEditorIframe');
            
                $iframe.height($this.height());
                $iframe.width('100%');
                $editorDiv.insertAfter($this).append($iframe);
                $this.hide();
                
                var $toolbar = $('<ul/>').addClass('apRichTextEditorToolbar').css('display', 'none');
                var toolbarHideTimer = false;
                
                data = $.extend({
                    $editor: $editorDiv,
                    $iframe: $iframe,
                    $toolbar: $toolbar,
                },data);
                $this.data('apRichTextEditor', data);
                
                if(!$iframe) { 
                    throw new Error('create iframe error)');
                    return false;
                }
                
                var getDoc = function(iframe){
                    if (iframe.contentDocument) return iframe.contentDocument;
                    else if (iframe.contentWindow && iframe.contentWindow.document) return iframe.contentWindow.document;
                    else if (iframe.document) return iframe.document;
                    else return null;        
                }
                
                var getWin = function(iframe){
                    if (iframe.contentWindow) return iframe.contentWindow;
                    else return null;        
                }
                
                var enableApRichTextEditor = function($this) {
                    var data = $this.data('apRichTextEditor');
                    var $iframe = data.$iframe;
                    var $editorDiv = data.$editor;
                    
                    switch ( src.tagName.toLowerCase() ) {
                        case 'textarea':
                            var content = $this.val();
                            break;
                        default:
                        case 'div':
                            var content = $this.html();
                            break;	
                    }      
                    var css = '<link href="'+ data.settings.css +'" type="text/css" rel="stylesheet"/>';
                    var doc = '<html><head>'+css+'</head><body class="apRichTextEditorBody"></body></html>';
                            
                    var iframe = $iframe.get(0);
                    var iframeDoc = getDoc(iframe);
                    
                    try {
                        iframeDoc.open();
                        iframeDoc.write(doc);
                        iframeDoc.close();
                    } catch(error) {
                        throw new Error('create iframe error ('+ error +')');
                    }
                    
                    var $iframeDoc = $(iframeDoc);
                    $iframeDoc.find('.apRichTextEditorBody').html(content);
                    
                    if (typeof(document.selection) != 'undefined') {
                        // ie
                        iframeDoc.designMode = "On";
                        iframeDoc.contentEditable = true;
                    } else if (document.designMode != null) {
                        try {
                            iframeDoc.designMode = "on";
                            //iframeDoc.xhtml = "0";
                            try {
                                iframeDoc.execCommand("useCSS", false, true);
                                iframeDoc.execCommand("insertBrOnReturn", false, false);
                            } 
                            catch(e) {
                                console.log(e);
                            }
                        } catch (error) {
                            throw new Error('designMode ('+ error +')');
                        }
                    }
                
                    var currentNode = false;
                    resizeDoc($iframe, 24);
                    
                    $(window).resize(function(event) {
                        resizeDoc($iframe, 24);
                    });
                    
                    $(getWin(iframe)).bind('blur', function(event) {
                        toolbarHideTimer = setTimeout(function(){
                             $toolbar.fadeOut('slow');
                        }, 150);
                    });
                    
                    $(getWin(iframe)).bind('focus', function(event) {
                        clearTimeout(toolbarHideTimer);
                        $toolbar.fadeIn();
                    });
                    
                    $iframeDoc.bind('mouseup', function(event) {
                        setSelectedButton(getHtmlPath(iframe));
                    });
                    
                    $iframeDoc.bind('keydown', function(event) {
                        var key = event.keyCode || event.which;
                        $this.trigger('apRichTextEditor.keydown', [iframe]);
                        if (!event.ctrlKey) {
                            switch ( key ) {
                                case 13:
                                    currentNode = getCurrentNode(iframe);
                                    $iframe.css('height', $iframeDoc.height() + 48);
                                    if (currentNode.tagName.toLowerCase() == 'div') {
                                        iframeDoc.execCommand('formatBlock', false, 'p');
                                    }
                                    break;
                            }
                            
                            if (!event.shiftKey && key == 9) {
                                event.preventDefault();
                                iframeDoc.execCommand('indent', false, false);
                            } // Tab
				            else if (event.shiftKey && key == 9 ) {
				                event.preventDefault();
				                iframeDoc.execCommand('outdent', false, false);// Shift + tab
				            }
                         
                        } else {
                            /*
                            if (key == 90) iframeDoc.execCommand('undo', false, 'p'); // Ctrl + z
                            else if (key == 90 && e.shiftKey) iframeDoc.execCommand('redo', false, false); // Ctrl + Shift + z
                            else if (key == 77) iframeDoc.execCommand('removeFormat', false, false); // Ctrl + m
                            else if (key == 66) iframeDoc.execCommand('bold', false, false); // Ctrl + b
                            else if (key == 73) iframeDoc.execCommand('italic', false, false); // Ctrl + i
                            else if (key == 74) iframeDoc.execCommand('insertunorderedlist', false, false); // Ctrl + j
                            else if (key == 75) iframeDoc.execCommand('insertorderedlist', false, false); // Ctrl + k
                            else if (key == 76) iframeDoc.execCommand('superscript', false, false); // Ctrl + l
                            */
                        }
                    });
                    
                    $iframeDoc.bind('keyup', function(event) {
                        var key = event.keyCode || event.which;
                        if (currentNode) {
                            currentTagName = currentNode.tagName.toLowerCase();
                        }
                        if (!event.ctrlKey) {
                            switch ( key ) {
                                case 13:
                                    if (data.settings.nextTagRules[currentTagName]) {
                                        iframeDoc.execCommand('formatBlock', false, data.settings.nextTagRules[currentTagName]);
                                    }
                                    break;
                            }
                        }
                        setSelectedButton(getHtmlPath(iframe));
                        resizeDoc($iframe, 24);
                        $this.trigger('apRichTextEditor.keyup', [iframe]);
                    });
                    
                    for (i = 0; i < data.settings.buttonsList.length; i++) {
                        if (data.settings.buttonsList[i] == 'SP') {
                            var $sp = $('<li/>').html('&nbsp;').addClass('apRichTextEditorSp');
                            $toolbar.append($sp);
                            continue;
                        }
                        var item = data.settings.buttons[data.settings.buttonsList[i] ];
                        var $bt = $('<li/>');
                        $bt.data('apRichTextEditorButton', item);
                        $bt.addClass('apRichTextEditorButton')
                            .addClass(item.label + 'Bt')
                            .click( function(event) {
                                clearTimeout(toolbarHideTimer);
                                var data = $(this).data('apRichTextEditorButton');
                                $this.trigger('apRichTextEditor.execCommand',['before', iframe, data]);
                                formatText(iframe, data.action, data.args);
                                $this.trigger('apRichTextEditor.execCommand',['after', iframe, data]);
                            }).attr('title', item.label);
                        var $btSpan = $('<span/>').html(item.label);
                        $bt.append($btSpan);
                        $toolbar.append($bt);
                    }
                    
                    $editorDiv.append($toolbar);
                    data.$editorBody = $iframeDoc.find('.apRichTextEditorBody');
                    $this.data('apRichTextEditor', data);
                    $this.trigger('apRichTextEditor.ready', [data]);
                };
                
                var resizeDoc = function($iframe, extra){
                    if (data.settings.autoResize) {
                        setTimeout(function(){
                            var iframe = $iframe.get(0);
                            var $iframeDoc = $(getDoc(iframe));
                            var children = $iframeDoc.find('body').children();
                            var lastChildOffset = $(children[children.length-1]).offset();
                            if (lastChildOffset) {
                                var height = lastChildOffset.top + $(children[children.length-1]).outerHeight();
                            } else {
                                var height = $(children[children.length-1]).outerHeight();
                            }
                            
                            $iframe.animate({
                                height: parseInt( height + extra)
                            }, 100);
                        },150);
                    }
                }
                
                var _getSelectionRange = function(iframe) {
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection();
                            range = selection.getRangeAt(0);
                        }
                        catch(e){
                            return false;
                        }
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        // alert(iframe.contentWindow.document.selection);
                        selection = iframe.contentWindow.document.selection;
                        range = selection.createRange();
                    } else {
                        return false;
                    }
                    return { selection : selection, range: range };
                };
                
                var _getSelectionString = function(iframe) {
                    var selection, node;
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection().toString();
                        }
                        catch(e){
                            return false;
                        }
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        selection = iframe.contentWindow.document.selection.createRange().text;
                    } else {
                        return false;
                    }
                    return selection;
                };
                
                var getSelectionElement = function(iframe) {
                    var selection, range, node;
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection();
                            range = selection.getRangeAt(0);
                        }
                        catch(e){
                            return false;
                        }
                        node = range.commonAncestorContainer;
                    } else if (iframe.contentWindow && iframe.contentWindow.document.selection) {
                        // IE 
                        selection = iframe.contentWindow.document.selection;
                        range = selection.createRange();
                        try {
                            node = range.parentElement();
                        }
                        catch (e) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                    return node;
                };
                
                /*
                
                    1	ELEMENT_NODE
                    2	ATTRIBUTE_NODE
                    3	TEXT_NODE
                    4	CDATA_SECTION_NODE
                    5	ENTITY_REFERENCE_NODE
                    6	ENTITY_NODE
                    7	PROCESSING_INSTRUCTION_NODE
                    8	COMMENT_NODE
                    9	DOCUMENT_NODE
                    10	DOCUMENT_TYPE_NODE
                    11	DOCUMENT_FRAGMENT_NODE
                    12`	NOTATION_NODE
                
                */
                
                var setSelectionElement = function(iframe, element, mode) {
                    var selection, range, node;

                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        
                        if (mode == 'block') {
                            var path = getHtmlPath(iframe);
                            try {
                                selection = iframe.contentWindow.getSelection().selectAllChildren(path[0]);
                            }
                            catch(e){
                                console.log(e);
                                return false;
                            }
                            return true;
                        } 

                        try {
                            selection = iframe.contentWindow.getSelection();
                            range = selection.getRangeAt(0);
                            node = range.commonAncestorContainer;
                            element = iframe.contentWindow.document.createRange();
                            range.selectNodeContents(node);
                            selection.addRange(range);
                        }
                        catch(e){
                            console.log(e);
                            return false;
                        }
                        
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        selection = iframe.contentWindow.document.selection;
                        range = iframe.contentWindow.document.body.createTextRange();
                        range.moveToElementText(element);
                        range.select();
                        
                    } else {
                        return false;
                    }
                    return true;
                }
                
                var getHtmlPath = function(iframe) {
                    var path = [];
                    var node = getSelectionElement(iframe);
                    while (node.nodeType != 1 || node.tagName.toLowerCase() != 'body') {
                        node = $(node).parent().get(0);
                        if (node.nodeType == 1 && node.tagName.toLowerCase() != 'body') {
                            path.unshift(node);
                        }
                    }
                    return path;
                 }
                 
                var getCurrentNode = function(iframe){
                    var node = getSelectionElement(iframe);
                    while (node.nodeType == 3){
                        node = $(node).parent().get(0);
                    }
                    return node;
                 }
                
                var formatText = function(iframe, command, args) {
                    iframe.contentWindow.focus();
                    if($.trim(_getSelectionString(iframe)).length == 0) {
                        setSelectionElement( iframe, getSelectionElement(iframe), 'block' );
                    }
                    currentNode = getCurrentNode(iframe);
                    var currentNodeTagName = currentNode.tagName.toLowerCase();
                    switch ( command ) {
                    	case 'normalize':
                    		    iframe.contentWindow.document.body.normalize();
                    		break;
                    		
                    	case 'insertOrderedList':
                    	case 'insertUnorderedList':
                                if (
                                    currentNodeTagName == 'ul' ||
                                    currentNodeTagName == 'ol'
                                ) {
                                    return;
                                }
                                if (
                                    currentNodeTagName != 'p' &&
                                    currentNodeTagName != 'div' &&
                                    currentNodeTagName != 'li'
                                ) {
                                    iframe.contentWindow.document.execCommand('formatBlock', false, 'p');
                                }
                                iframe.contentWindow.document.execCommand(command, false, args);
                    		break;
                    		
                    	case 'heading':
                                currentNode = resetList(iframe, currentNode);
                                currentNodeTagName = currentNode.tagName.toLowerCase();
                                if (
                                    currentNodeTagName == 'p' ||
                                    currentNodeTagName == 'div' ||
                                    currentNodeTagName == 'h1' ||
                                    currentNodeTagName == 'h2' ||
                                    currentNodeTagName == 'h3' ||
                                    currentNodeTagName == 'h4' ||
                                    currentNodeTagName == 'h5' ||
                                    currentNodeTagName == 'h6'
                                ) {
                                    try {
                                        iframe.contentWindow.document.execCommand('formatBlock', false, args);
                                    } 
                                    catch(e) {
                                        
                                        console.log(e);
                                    }
                                }
                    		break;
                    		
                    	case 'formatBlock':
                    	        currentNode = resetList(iframe, currentNode);
                    	        currentNodeTagName = currentNode.tagName.toLowerCase();
                                iframe.contentWindow.document.execCommand(command, false, args);
                                try {
                                    iframe.contentWindow.document.execCommand(command, false, args);
                                } 
                                catch(e) {
                                    
                                    console.log(e);
                                }
                    		break;

                    	default:
                    		try {
                                iframe.contentWindow.document.execCommand(command, false, args);
                            } 
                            catch(e) {
                                
                                console.log(e);
                            }
                    }
                    setSelectedButton(getHtmlPath(iframe));
                    resizeDoc($iframe, 24);
                };
                
                var resetList = function (iframe, currentNode) {
                    /* todo USE  Path to reset list items */
                    var currentNodeTagName = currentNode.tagName.toLowerCase();
                	while (currentNodeTagName == 'li') {
                        var parentTag = $(currentNode).parent().get(0);
                        switch ( parentTag.tagName.toLowerCase() ) {
                            case 'ul':
                                var listCommand = 'insertUnorderedList';
                                break;
                            case 'ol':
                                var listCommand = 'insertOrderedList';
                                break;
                            default:
                                return currentNode;
                        }
                        try {
                            iframe.contentWindow.document.execCommand(listCommand, false, false);
                        } 
                        catch(e) {
                            
                            console.log(e);
                        }
                        currentNode = getCurrentNode(iframe);
                        currentNodeTagName = currentNode.tagName.toLowerCase();
                    }
                    return currentNode;
                }
                
                var setSelectedButton = function (path) {
                    var data = $this.data('apRichTextEditor');
                    var $toolbar = data.$toolbar;
                    $toolbar.children('li').removeClass('selected');
                    for (var i = 0; i < path.length; i++ ) {
                    	switch ( path[i].tagName.toLowerCase() ) {
                            case 'b':
                                $toolbar.children('.boldBt').addClass('selected');
                                break;
                            case 'i':
                                $toolbar.children('.italicBt').addClass('selected');
                                break;
                            case 'p':
                                $toolbar.children('.paragraphBt').addClass('selected');
                                break;
                                break;
                            case 'h1':
                                $toolbar.children('.H1Bt').addClass('selected');
                                break;
                            case 'h2':
                                $toolbar.children('.H2Bt').addClass('selected');
                                break;
                            case 'h3':
                                $toolbar.children('.H3Bt').addClass('selected');
                                break;
                            case 'h4':
                                $toolbar.children('.H4Bt').addClass('selected');
                                break;
                            case 'blockcote':
                                
                                break;
                            case 'ol':
                                $toolbar.children('.insertOrderedListBt').addClass('selected');
                                break;
                            case 'ul':
                                $toolbar.children('.insertUnorderedListBt').addClass('selected');
                                break;
                        }
                    }
                }
                setTimeout(function(){ enableApRichTextEditor($this) }, 500);
            });
        },
        save: function(options) {
            return this.each(function() {
                $(this).apRichTextEditor('init', options);
                var data = $(this).data('apRichTextEditor');
                if(!data) return;
                
                var $this = $(this);
                var $iframe = data.$iframe;
                
                switch ( $this.tagName ) {
                	case 'textarea':
                		$this.val($iframe.html());
                		break;
                	
                	default:
                	case 'div':
                		$this.html($iframe.html());
                		break;	
                }
                data.$iframe.remove();
            }); 
        }
    }   
    
    jQuery.fn.apRichTextEditor = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.apRichTextEditor');
        }
    };
    
    jQuery.fn.richTextEditor = jQuery.fn.apRichTextEditor;

})(jQuery);

