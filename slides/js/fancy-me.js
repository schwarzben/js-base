$(function(){
  $('pre').each(function(){
    $(this).html($(this).html().trim().replace(/^\s+|\s+$/g, ''));
  });
  $('code').each(function(){
    $(this).text($(this).text().replace(/^\s+|\s+$/g, ''));
  });
  Prism.highlightAll(false, function() {
    $('.fancy').each(function(){
      var block = $(this);
      if(block.hasClass('fancyed')) return;
      block.addClass('fancyed');
      var header = $(
          "<h3 class='fancy-header'>" +
            "<span class='daten'>Daten</span>" +
            "<span class='operants'>Operatoren</span>" +
            "<span class='syntax'>Syntax</span>" +
            "<span class='functions'>Funktionen</span>" +
            "<span class='keywords'>Keywords</span>" +
            "<span class='vars'>Variablen</span>" +
            "<span class='objects'>Objekte</span>" +
          "</h3>"
      ).insertAfter(block);
      $('span.syntax',header).hover(function(){
        $(block).add('code span.punctuation',block).toggleClass('highlight');
      });
      $('span.daten,span.string,span.number',header).hover(function(){
        $(block).add('code span.string,code span.number',block).toggleClass('highlight');
      });
      $('span.operants',header).hover(function(){
        $(block).add('code span.operator',block).toggleClass('highlight');
      });
      $('span.functions',header).hover(function(){
        $(block).add('code span.function,code span.browserfunction',block).toggleClass('highlight');
      });
      $('span.keywords',header).hover(function(){
        $(block).add('code span.keyword',block).toggleClass('highlight');
      });
      $('span.vars',header).hover(function(){
        $(block).add('code span.browser,code',block).toggleClass('highlight');
      });
      $('span.objects',header).hover(function(){
        $(block).add('code span.class-name,code span.class',block).toggleClass('highlight');
      });
    });
  });
});