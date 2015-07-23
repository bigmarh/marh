module.exports = function(module, app) {
    module.view = function(ctrl) {
        return m('ul', [
            module.$.list().map(function(list_item) {
                return m('li.item', list_item.first_name + ' ' + list_item.last_name);
            }),
            $pa.c('button', {
                click: module.$.addNewUser
            }, 'Add New User')
        ]);


    };
}
