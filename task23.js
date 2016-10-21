var timer = null;
var btns= document.getElementsByTagName("button");
var rootNode = document.getElementsByClassName("one")[0];
var lock = false;
var BFindex = 0;//广度优先遍历自增标识符

function DForder(node,nodelist){
	if(!(node == null)){
        nodelist.push(node);
        for (var i = 0; i < node.children.length; i++) {
        	DForder(node.children[i],nodelist);
        }
    }
}
function BForder(node,nodelist){
	if(!(node == null)){
        nodelist.push(node);
        BForder(node.nextElementSibling,nodelist);
        node=nodelist[BFindex++];
        BForder(node.firstElementChild,nodelist);
    }
}
function render(nodelist,foundText){
	var len=nodelist.length;
	var i=0;
	lock=true;
	timer=setInterval(function(){
		if (i<len) {
			if(i>0){nodelist[i-1].style.backgroundColor="#FFFFFF";}
			
			if (nodelist[i].firstChild.nodeValue.trim()==foundText) {
				nodelist[i].style.backgroundColor="red";
				lock=false;
				clearInterval(timer);
			}else{
				nodelist[i++].style.backgroundColor="blue";
			}
		}
		else{
			nodelist[i-1].style.backgroundColor="#FFFFFF";
			lock=false;
			clearInterval(timer);
		}
	},500)
}

function traverse(i){
	var nodelist=[];
	// var foundText=document.getElementsByTagName("input")[0].value;
	switch(i){
		case 0:
			DForder(rootNode,nodelist);
			break;
		case 1:
			BFindex=0;
			BForder(rootNode,nodelist);
			break;
		case 2:
			var foundText = document.getElementsByTagName("input")[0].value.trim();
			DForder(rootNode,nodelist);
			  break;
		case 3:
			var foundText = document.getElementsByTagName("input")[0].value.trim();
			BFindex=0;
			BForder(rootNode,nodelist);
			break;
	}
	reset();
	setTimeout(render(nodelist,foundText),500);
}

function reset(){
	var nodelist_0=[];
	DForder(rootNode,nodelist_0);
	for (var i = 0; i < nodelist_0.length; i++) {
		nodelist_0[i].style.backgroundColor="#FFFFFF";
	}
}
function init(){
	for (var i = 0; i < btns.length; i++) {
		(function(i){
			 btns[i].onclick = function(){
				if(lock === true){
					alert("正在遍历中!");
				}
				else{
					traverse(i);
				}	
			};
		}(i));
	}
}
init();