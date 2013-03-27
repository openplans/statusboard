/*global jQuery _ Tabletop ich */

(function(S, $) {
  'use strict';

  S.init = function(options) {
    var _options = _.extend({}, options);

    $.expr[':'].icontains = function(a, i, m) {  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; };

    var _$navContainer = $('#statusboard-navigation-container'),
        _$statusboardListContainer = $('#statusboard-list-container'),
        _goalFilter = 'outcome',
        _actionFilter = 'action',
        _toolFilter = 'tool',
        _multipleCategoryDelim = '|',
        _$textSearch,
        _categoryFilter,
        _textFilter;

    function filter() {
      var $noResultsMessage = $('#no-search-results'),
          multiCats,
          catSelector,
          i;

      if (_categoryFilter) {
        _$statusboardListContainer.find('li').hide();

        if (_categoryFilter.indexOf(_multipleCategoryDelim) >= 0) {
          multiCats = _categoryFilter.split(_multipleCategoryDelim);

          for (i=0; i<multiCats.length; i++) {
            multiCats[i] = 'li[data-category*="'+multiCats[i]+'"]';
          }

          catSelector = multiCats.join(',');
        } else {
          catSelector = 'li[data-category*="'+_categoryFilter+'"]';
        }

        _$statusboardListContainer.find(catSelector).show();
      } else {
        _$statusboardListContainer.find('li').show();
      }

      if (_textFilter) {
        _$statusboardListContainer.find('li:not(:icontains("'+_textFilter+'"))').hide();
      }

      if (_$statusboardListContainer.find('.statusboard-item').is(':visible')) {
        $noResultsMessage.css('visibility', 'hidden');
      } else {
        $noResultsMessage.css('visibility', 'visible');
      }
    }

    function bindCategoryClick() {
      var $categoryItems = _$navContainer.find('a:not(#statusboard-search-clear)').parent();
      $categoryItems.click(function(evt) {
        evt.preventDefault();
        var $this = $(this);

        $categoryItems.removeClass('is-selected');
        $this.addClass('is-selected');

        _categoryFilter = $this.find('a').attr('data-filter');

        _$textSearch.val('');
        _textFilter = '';
        filter();
      });
    }

    function bindTextSearchChange() {
      _$textSearch.keyup(function() {
        var val = $(this).val();
        if (val !== _textFilter) {
          if (val === '') {
            _categoryFilter = _goalFilter + _multipleCategoryDelim + _actionFilter;
            $('.navigation-header:first').addClass('is-selected');
          } else {
            _categoryFilter = '';
            $('.is-selected').removeClass('is-selected');
          }

          _textFilter =  $(this).val();
          filter();
        }
      });

      $('#statusboard-search-clear').click(function() {
        _$textSearch.val('');
        _textFilter = '';
        filter();
      });
    }

    function init(data) {
      var $statusboardList = ich['statusboard-list-tpl']({statusboardItems: data}),
          goalData = _.filter(data, function(obj) { return obj.type === _goalFilter; }),
          toolData = _.filter(data, function(obj) { return obj.type === _toolFilter; }),
          goalCategories = _.uniq(_.pluck(goalData, 'category')),
          toolCategories = _.uniq(_.pluck(toolData, 'category')),
          $categoryList = ich['nav-tpl']({
            goal_filter: _goalFilter + _multipleCategoryDelim + _actionFilter,
            goal_categories: goalCategories,
            tool_categories: toolCategories,
            tool_filter: _toolFilter
          });

      _$navContainer.html($categoryList);
      _$statusboardListContainer.html($statusboardList);

      _$textSearch = $('#statusboard-search');

      bindCategoryClick();
      bindTextSearchChange();

      // Autofocus to the category filter that is selected
      $('.navigation-header:first').click();
    }

    // Go!
    new Tabletop({
      key: _options.url,
      callback: init,
      simpleSheet: true
    });
  };
}(window.Statusboard = window.Statusboard || {}, jQuery ));
