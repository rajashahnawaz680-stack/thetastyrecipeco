/* Site search: toggles the search bar in the header and searches
   the site's recipes and categories, showing matching links with
   a short description for each result. */
(function () {
  var RECIPES = [
    { t: '35+ Easy Christmas Appetizers for a Crowd', c: 'Appetizers & Snacks', u: 'posts/easy-christmas-appetizers-for-a-crowd.html', d: '35+ easy appetizers for a crowd — dips, bites, cheese boards and warm starters.' },
    { t: '30+ Christmas Cookie Recipes Everyone Will Love', c: 'Desserts & Baking', u: 'posts/christmas-cookie-recipes.html', d: '30+ Christmas cookies everyone will love — classic, chocolate, spiced, filled and decorated.' },
    { t: '25+ No-Bake Christmas Desserts for a Crowd', c: 'Desserts & Baking', u: 'posts/no-bake-christmas-desserts-for-a-crowd.html', d: '25+ no-bake Christmas desserts for a crowd — truffles, cheesecakes, bars and treats.' },
    { t: '25+ Christmas Breakfast Recipes for a Cozy Holiday Morning', c: 'Breakfast & Brunch', u: 'posts/christmas-breakfast-recipes.html', d: '25+ Christmas breakfast recipes for a cozy holiday morning — casseroles, pancakes, cinnamon rolls and make-ahead bakes.' },
    { t: '25+ Christmas Side Dishes for Your Holiday Table', c: 'Lunch & Dinner', u: 'posts/christmas-side-dishes.html', d: '25+ Christmas side dishes for your holiday table — roasted vegetables, creamy potatoes, stuffing and cranberry sauce.' },
    { t: '20+ Christmas Air Fryer Recipes for Easy Holiday Cooking', c: 'Air Fryer Recipes', u: 'posts/christmas-air-fryer-recipes.html', d: '20+ Christmas air fryer recipes for easy holiday cooking — crispy appetizers, roasted vegetables and festive desserts.' },
    { t: '25+ Easy New Year\'s Eve Appetizers for a Crowd', c: 'Appetizers & Snacks', u: 'posts/easy-new-years-eve-appetizers-for-a-crowd.html', d: '25+ easy New Year\'s Eve appetizers for a crowd — bite-size party snacks, dips and finger foods for ringing in the New Year.' },
    { t: '30+ Vintage Christmas Cookie Recipes', c: 'Desserts & Baking', u: 'posts/vintage-christmas-cookie-recipes.html', d: '30+ vintage Christmas cookie recipes — old-fashioned cookies from grandma\'s kitchen, from spritz and snickerdoodles to molasses and jam thumbprints.' },
    { t: '25+ Christmas Snowball Cookie Recipes', c: 'Desserts & Baking', u: 'posts/christmas-snowball-cookie-recipes.html', d: '25+ Christmas snowball cookie recipes — buttery, melt-in-your-mouth snowball cookies in every flavor, rolled in powdered sugar.' },
    { t: '25+ Make Ahead Christmas Appetizers', c: 'Appetizers & Snacks', u: 'posts/make-ahead-christmas-appetizers.html', d: '25+ make ahead Christmas appetizers — party bites you can prep days before, from cheese balls and dips to pinwheels and stuffed mushrooms.' },
    { t: '25+ Christmas Pie Recipes for a Sweet Holiday Table', c: 'Desserts & Baking', u: 'posts/christmas-pie-recipes.html', d: '25+ Christmas pie recipes for a sweet holiday table — classic apple, pumpkin and pecan pies plus festive tarts and hand pies for Christmas Day.' },
    { t: '20+ New Year\'s Eve Dinner Ideas for Family and Friends', c: 'Lunch & Dinner', u: 'posts/new-years-eve-dinner-ideas.html', d: '20+ New Year\'s Eve dinner ideas for family and friends — festive mains, from roast beef and salmon to pasta and slow cooker favorites.' },
    { t: '25+ Easy Christmas Crockpot Recipes', c: 'Lunch & Dinner', u: 'posts/easy-christmas-crockpot-recipes.html', d: '25+ easy Christmas crockpot recipes — slow cooker mains, soups, sides and desserts for a hands-off holiday table.' },
    { t: '20+ Crockpot Christmas Appetizers for Parties', c: 'Appetizers & Snacks', u: 'posts/crockpot-christmas-appetizers-for-parties.html', d: '20+ crockpot Christmas appetizers for parties — slow cooker dips, sliders, wings and bites that stay warm all night.' },
    { t: '25+ Slow Cooker Christmas Dinner Ideas', c: 'Lunch & Dinner', u: 'posts/slow-cooker-christmas-dinner-ideas.html', d: '25+ slow cooker Christmas dinner ideas — festive mains from lasagna and curry to chili and carnitas, all made hands-off.' },
    { t: '15+ Easy Christmas Crockpot Meals for a Crowd', c: 'Lunch & Dinner', u: 'posts/easy-christmas-crockpot-meals-for-a-crowd.html', d: '15+ easy Christmas crockpot meals for a crowd — big-batch soups, pies, stews and mains that feed a full table.' },
    { t: '25+ Christmas Salmon Recipes for a Festive Holiday Dinner', c: 'Lunch & Dinner', u: 'posts/christmas-salmon-recipes.html', d: '25+ Christmas salmon recipes for a festive holiday dinner — glazed, roasted, crusted and smoked salmon mains for Christmas Day.' },
    { t: '25+ Healthy Christmas Recipes for a Lighter Holiday Table', c: 'Healthy Recipes', u: 'posts/healthy-christmas-recipes.html', d: '25+ healthy Christmas recipes for a lighter holiday table — fresh salads, roasted vegetables, lean mains and light desserts.' },
    { t: '25+ Christmas Cake Recipes for a Sweet Holiday Table', c: 'Desserts & Baking', u: 'posts/christmas-cake-recipes.html', d: '25+ Christmas cake recipes for a sweet holiday table — yule logs, layer cakes, bundts and pound cakes for Christmas Day.' },
    { t: 'All Recipes', c: 'Recipe archive', u: 'recipes.html', d: 'Browse every published roundup in one place.' },
    { t: 'Breakfast & Brunch', c: 'Recipe category', u: 'categories/breakfast-brunch.html', d: 'Browse roundups in this category.' },
    { t: 'Lunch & Dinner', c: 'Recipe category', u: 'categories/lunch-dinner.html', d: 'Browse roundups in this category.' },
    { t: 'Desserts & Baking', c: 'Recipe category', u: 'categories/desserts-baking.html', d: 'Browse roundups in this category.' },
    { t: 'Air Fryer Recipes', c: 'Recipe category', u: 'categories/air-fryer-recipes.html', d: 'Browse roundups in this category.' },
    { t: 'Healthy Recipes', c: 'Recipe category', u: 'categories/healthy-recipes.html', d: 'Browse roundups in this category.' },
    { t: 'Appetizers & Snacks', c: 'Recipe category', u: 'categories/appetizers-snacks.html', d: 'Browse roundups in this category.' }
  ];

  var toggle = document.querySelector('.search-toggle');
  var bar = document.getElementById('search-bar');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var closeBtn = document.querySelector('.search-close');
  if (!toggle || !bar || !input || !results) return;

  /* Result links are root-relative so search works from every page,
     including the 404 page served at any path depth. */
  var prefix = '/';

  function render(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('show'); results.innerHTML = ''; return; }
    var matches = RECIPES.filter(function (r) {
      return (r.t + ' ' + r.c + ' ' + r.d).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 8);
    if (!matches.length) {
      results.innerHTML = '<div class="no-result">No recipes found &mdash; try another search or <a class="no-result-link" href="' + prefix + 'index.html#categories">browse our categories</a>.</div>';
    } else {
      results.innerHTML = matches.map(function (r) {
        return '<a href="' + prefix + r.u + '"><span class="sr-main"><b>' + r.t + '</b><span class="sr-desc">' + r.d + '</span></span><span>' + r.c + '</span></a>';
      }).join('');
    }
    results.classList.add('show');
  }

  function open() {
    bar.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
  }
  function close() {
    bar.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    input.value = '';
    results.classList.remove('show');
    results.innerHTML = '';
  }

  toggle.addEventListener('click', function () {
    if (bar.classList.contains('open')) close(); else open();
  });
  closeBtn.addEventListener('click', close);
  input.addEventListener('input', function () { render(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  document.addEventListener('click', function (e) {
    if (bar.classList.contains('open') && !bar.contains(e.target) && !toggle.contains(e.target)) close();
  });
})();
