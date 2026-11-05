(function () {
  var links = [].slice.call(
    document.querySelectorAll('.subnav a:not(.cta)')
  );
  var sectionLinks = {};

  links.forEach(function (link) {
    sectionLinks[link.getAttribute('href').slice(1)] = link;
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var activeLink = sectionLinks[entry.target.id];
          if (!entry.isIntersecting || !activeLink) {
            return;
          }

          links.forEach(function (link) {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          });
          activeLink.classList.add('is-active');
          activeLink.setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    [
      'overview',
      'capabilities',
      'controllers',
      'displays',
      'specs',
      'remote',
      'standards'
    ].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) {
        sectionObserver.observe(section);
      }
    });
  }

  var form = document.getElementById('f');
  var message = document.getElementById('msg');

  if (form && message) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        message.textContent =
          "We couldn't send your request. Check the highlighted fields and try again.";
        form.reportValidity();
        return;
      }

      message.textContent =
        'Thanks. We received your request and will reply within [TODO] working days.';
      form.reset();
    });
  }

  var cardsContainer = document.getElementById('cs');
  var reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!cardsContainer) {
    return;
  }

  var cards = [].slice.call(cardsContainer.querySelectorAll('.card'));

  if (!reducedMotion && cards.length > 0) {
    var track = document.createElement('div');
    track.className = 'track';

    cards.forEach(function (card) {
      track.appendChild(card);
    });

    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('inert', '');
      track.appendChild(clone);
    });

    cardsContainer.appendChild(track);
    cardsContainer.classList.add('marquee', 'pre');

    var holdTimeout;
    cardsContainer.addEventListener(
      'touchstart',
      function () {
        clearTimeout(holdTimeout);
        cardsContainer.classList.add('hold');
      },
      { passive: true }
    );
    cardsContainer.addEventListener(
      'touchend',
      function () {
        holdTimeout = setTimeout(function () {
          cardsContainer.classList.remove('hold');
        }, 4000);
      },
      { passive: true }
    );

    if ('IntersectionObserver' in window) {
      var entranceObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            cards.forEach(function (card, index) {
              card.style.transitionDelay =
                Math.min(index, 9) * 60 + 'ms';
            });
            cardsContainer.classList.add('in');
            entranceObserver.unobserve(cardsContainer);

            setTimeout(function () {
              cardsContainer.classList.remove('pre', 'in');
              cards.forEach(function (card) {
                card.style.transitionDelay = '';
              });
            }, 1500);
          });
        },
        { threshold: 0.2 }
      );

      entranceObserver.observe(cardsContainer);
    } else {
      cardsContainer.classList.remove('pre');
    }
  }
})();
