module.exports = {

    routeHandler: function(route, params) {
    	/**
			Splits up string route and seprates it based on the convention app/module/submodule.
    	**/
        var modalInfo;
    	//remove # from the string
    	route = route.substring(1);
    	//split at ? to remove options
    	routeParamsSplit = route.split('?');
    	if(route.length >= 1) route = routeParamsSplit[0]; 
    	routeArray = route.split('/');
        if(routeArray[2] == "") routeArray.splice(2);
        var hasModule =  params.app[routeArray[0]];
    	switch(routeArray.length){
    		case 1:
    		component = params.app[routeArray[0]];
            options =   routeParamsSplit[1] ? JSON.parse(routeParamsSplit[1]):{};
    		break;
    		case 2: 
    		component = params.app[routeArray[0]][routeArray[1]];
            options = routeParamsSplit[1] ? JSON.parse(routeParamsSplit[1]):{};
            modalInfo = component && new component.controller().Modal;
    		break;
    		case 3: 
    		component = params.app[routeArray[0]][routeArray[1]]['submodules'][routeArray[2]](params.app[routeArray[0]][routeArray[1]]);
            options =  routeParamsSplit[1] ? JSON.parse(routeParamsSplit[1]):{};
            modalInfo = component && new component.controller().Modal;
            break;
    	}

        return  (hasModule) && {content:component, options:options, modalOptions:modalInfo}
    }

}
