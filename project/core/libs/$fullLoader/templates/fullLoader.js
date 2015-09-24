module.exports = function(ctrl, args, compose) {
    return m(".logoBg", [
        m(".preloader-wrapper.big.active", [
            m(".spinner-layer.spinner-blue-only", [
                m(".circle-clipper.left", [
                    m(".circle")
                ]),
                m(".gap-patch", [
                    m(".circle")
                ]),
                m(".circle-clipper.right", [
                    m(".circle")
                ])
            ])
        ]),
        args.text && m("[layout='row'][layout-align='center center'][layout-padding='']", [
            m("small.fullLoaderText[layout-padding='']", args.text() || 'Loading...')
        ])
    ])
}
