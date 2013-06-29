Array.prototype.IsIn = function(val){
	for(k=0; k < this.length; k++){
		if(this[k]==val) return true;
	}
	return false;
};

var Plan = Class.extend({
	init:function(x, y, num_min, num_max, interdit, name){
		this.table = document.createElement("div");
		this.table.className = "table";
		this.table.style.display = "table";
		this.table.style.padding = "0";
		this.table.style.margin = "0.2em";
		this.table.style.width = "100%";
		this.table.style.height = "100%";
		if(name != undefined) this.table.id = name;
		for(i = 0; i < x; i++){
			for(j = 0; j < y; j++){
				var cell = document.createElement("div");
				cell.className = "cell";
				cell.style.width = (90/y)+"%";
				cell.style.height = (90/x)+"%";
				var num = document.createElement("span");
				num.className = "number";
				var data = document.createElement("span");
				data.className = "name";
				if(num_min+i*y+j <= num_max && !interdit.IsIn(num_min+i*y+j)){
					num.innerHTML = num_min+i*y+j;
					cell.setAttribute("data-drop","true");
				}
				else{
					num.innerHTML = "&nbsp;";
					cell.setAttribute("data-drop","false");
				}
				cell.appendChild(data);
				cell.appendChild(num);
				this.table.appendChild(cell);
			}
		}
	},
	getTable:function(){
		return this.table;
	}
});