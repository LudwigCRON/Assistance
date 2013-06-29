var Promise  = Class.extend({
	init:function(){
		this._state = "pending"
		this._succesFn = [];
		this._errorFn = [];
		this._alwaysFn = [];
		this._rearmable = false;
		return this;
	},
	when:function(fn){
		return this;
	},
	then:function(success, error, always){
		this._succesFn.push(success);
		this._errorFn.push(error);
		this._alwaysFn.push(always);
		return this;
	},
	state:function(){
		return this._state;
	},
	resolve:function(param){
		this._state = "resolved";
		if(this._succesFn.length>0 && this._succesFn[0]!=undefined){
			if(this._rearmable) fn = this._succesFn.slice(0,1)[0];
			else fn = this._succesFn.splice(0,1)[0];
			fn(param);
		}
		if(this._alwaysFn.length>0 && this._alwaysFn[0]!=undefined){
			if(this._rearmable) fn = this._alwaysFn.slice(0,1)[0];
			else fn = this._alwaysFn.splice(0,1)[0];
			fn(param);
		}
	},
	error:function(param){
		this._state = "error";
		if(this._errorFn.length>0 && this._errorFn[0]!=undefined){
			if(this._rearmable) fn = this._errorFn.slice(0,1)[0];
			else fn = this._errorFn.splice(0,1)[0];
			fn(param);
		}
		if(this._alwaysFn.length>0 && this._alwaysFn[0]!=undefined){
			if(this._rearmable) fn = this._alwaysFn.slice(0,1)[0];
			else fn = this._alwaysFn.splice(0,1)[0];
			fn(param);
		}
	},
	rearmable:function(){
		this._rearmable = true;
		return this;
	}
});

var Async = Promise.extend({
	init:function(fn){
		this._super();
		this.ToExecute = fn;
		self = this;
		return this;
	},
	run:function(){
		self.ToExecute(this.arguments);
	}
});