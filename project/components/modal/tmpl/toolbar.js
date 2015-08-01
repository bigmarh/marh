module.exports= function(){
  return m('md-toolbar', [
      m(".md-toolbar-tools", [
        m("h2", "Mango (Fruit)"),
        m("span[flex='']"),
        m(
          "button.md-icon-button.md-button.md-default-theme[ng-click='answer(\'not applicable\')'][ng-transclude=''][tabindex='0']", [
            m(
              "md-icon.ng-scope.ng-isolate-scope.md-default-theme[aria-hidden='true'][aria-label='Close dialog'][md-svg-src='img/icons/ic_close_24px.svg']", [
                m(
                  "svg[fit=''][height='100%'][preserveAspectRatio='xMidYMid meet'][viewBox='0 0 24 24'][width='100%'][xmlns='http://www.w3.org/2000/svg']", {
                    style: {
                      "pointer-events": " none",
                      " display": " block"
                    }
                  }, [m(
                    "path[d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z']"
                  )])
              ])
          ])

      ])
    ])}
