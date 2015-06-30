module.exports = function(module){
	  //the Todo class has two properties
    module.Todo = function(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    };

    //the TodoList class is a list of Todo's
    module.TodoList = Array;
}