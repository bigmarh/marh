module.exports = function(ctrl, args, compose) {
    return function(ctrl, args) {
        return m(".logoBg#lazyLoader", [
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
            ])
        ])
    }
}
